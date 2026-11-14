<%@ WebHandler Language="C#" Class="ContactHandler" %>

// Contact form endpoint for the static site on SmarterASP (IIS + ASP.NET 4.x).
// POST /api/contact.ashx (form-encoded or multipart) -> sends an email via SMTP.
// SMTP settings come from <appSettings file="App_Data\smtp.config"> in web.config;
// that file is generated at deploy time from GitHub secrets and is never committed.

using System;
using System.Configuration;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Caching;

public class ContactHandler : IHttpHandler
{
    public bool IsReusable { get { return true; } }

    const int MaxPerWindow = 5;
    static readonly TimeSpan Window = TimeSpan.FromMinutes(10);
    static readonly Regex EmailRx = new Regex(@"^[^@\s]+@[^@\s]+\.[^@\s]+$", RegexOptions.Compiled);

    public void ProcessRequest(HttpContext ctx)
    {
        ctx.Response.ContentType = "application/json";
        ctx.Response.Cache.SetCacheability(HttpCacheability.NoCache);

        if (ctx.Request.HttpMethod != "POST") { Reply(ctx, 405, false, "Method not allowed."); return; }

        // Unvalidated: ASP.NET request validation would 500 on any "<" in a message.
        // Every value is HTML-encoded (H) or header-stripped (Clean) before use.
        ctx.Request.ContentEncoding = Encoding.UTF8; // browsers post UTF-8; host default may differ
        var f = ctx.Request.Unvalidated.Form;
        // Honeypot: bots fill hidden fields. Pretend success.
        if (!string.IsNullOrEmpty(f["website"])) { Reply(ctx, 200, true, "Sent."); return; }

        string name = Clean(f["name"], 100);
        string email = Clean(f["email"], 200);
        string company = Clean(f["company"], 150);
        string phone = Clean(f["phone"], 50);
        string service = Clean(f["service"], 100);
        string budget = Clean(f["budget"], 50);
        string message = (f["message"] ?? "").Trim();
        if (message.Length > 5000) message = message.Substring(0, 5000);

        if (name.Length == 0 || message.Length == 0 || !EmailRx.IsMatch(email))
        { Reply(ctx, 400, false, "Please provide your name, a valid email, and a message."); return; }

        string ip = ctx.Request.UserHostAddress ?? "unknown";
        if (RateLimited(ctx, ip)) { Reply(ctx, 429, false, "Too many messages. Please try again later."); return; }

        string host = ConfigurationManager.AppSettings["SmtpHost"];
        string user = ConfigurationManager.AppSettings["SmtpUser"];
        string pass = ConfigurationManager.AppSettings["SmtpPass"];
        string to = ConfigurationManager.AppSettings["ContactTo"] ?? user;
        int port;
        if (!int.TryParse(ConfigurationManager.AppSettings["SmtpPort"], out port)) port = 587;
        bool ssl = !"false".Equals(ConfigurationManager.AppSettings["SmtpSsl"], StringComparison.OrdinalIgnoreCase);

        if (string.IsNullOrEmpty(host) || string.IsNullOrEmpty(user) || string.IsNullOrEmpty(pass))
        { Reply(ctx, 500, false, "Mail is not configured."); return; }

        string brand = ConfigurationManager.AppSettings["BrandName"] ?? "Felinn Labs";
        string site = ConfigurationManager.AppSettings["SiteUrl"] ?? "https://felinnlabs.com";
        string waDisplay = ConfigurationManager.AppSettings["ContactWhatsApp"] ?? "+94 74 206 6193";

        var rows = new StringBuilder();
        Row(rows, "Name", name);
        Row(rows, "Email", "<a href=\"mailto:" + H(email) + "\" style=\"color:#f97316;text-decoration:none\">" + H(email) + "</a>", true);
        Row(rows, "Phone", phone);
        Row(rows, "Company", company);
        Row(rows, "Service", service);
        Row(rows, "Budget", budget);

        string adminHtml = Layout(brand, site,
            "New website enquiry",
            "<p style=\"margin:0 0 20px;color:#a1a1aa\">Someone just filled in the contact form on " + H(site) + ".</p>" +
            "<table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:collapse\">" + rows + "</table>" +
            "<div style=\"margin-top:24px;padding:20px;border-radius:12px;background:#18181b;border:1px solid #27272a;color:#e4e4e7;line-height:1.6;white-space:pre-wrap\">" + H(message) + "</div>" +
            Button("mailto:" + email + "?subject=" + Uri.EscapeDataString("Re: your enquiry to " + brand), "Reply to " + name) +
            "<p style=\"margin:24px 0 0;font-size:12px;color:#71717a\">Sender IP: " + H(ip) + "</p>");

        string first = name.Split(' ')[0];
        string customerHtml = Layout(brand, site,
            "Thanks, " + first + "! We've got your message.",
            "<p style=\"margin:0 0 16px;color:#d4d4d8;line-height:1.7\">Thank you for reaching out to " + H(brand) + ". Your enquiry has reached our team and one of us will get back to you <strong style=\"color:#fafafa\">within one business day</strong>.</p>" +
            "<p style=\"margin:0 0 24px;color:#d4d4d8;line-height:1.7\">In the meantime, feel free to explore our recent work or reach us directly:</p>" +
            "<table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:collapse\">" +
            "<tr><td style=\"padding:6px 16px 6px 0;color:#71717a;font-size:14px\">Email</td><td style=\"padding:6px 0;font-size:14px\"><a href=\"mailto:" + H(to) + "\" style=\"color:#f97316;text-decoration:none\">" + H(to) + "</a></td></tr>" +
            "<tr><td style=\"padding:6px 16px 6px 0;color:#71717a;font-size:14px\">WhatsApp</td><td style=\"padding:6px 0;font-size:14px\"><a href=\"https://wa.me/" + H(Regex.Replace(waDisplay, @"\D", "")) + "\" style=\"color:#f97316;text-decoration:none\">" + H(waDisplay) + "</a></td></tr>" +
            "</table>" +
            Button(site + "/works/", "See our work") +
            "<p style=\"margin:28px 0 0;color:#a1a1aa;line-height:1.7\">Warm regards,<br><strong style=\"color:#fafafa\">The " + H(brand) + " team</strong></p>");

        try
        {
            ServicePointManager.SecurityProtocol |= SecurityProtocolType.Tls12;
            using (var smtp = new SmtpClient(host, port))
            {
                smtp.EnableSsl = ssl;
                smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtp.UseDefaultCredentials = false;
                smtp.Credentials = new NetworkCredential(user, pass);
                smtp.Timeout = 20000;

                // 1) Notification to the team. Sent from the authenticated mailbox
                //    (SPF/DMARC); Reply-To is the visitor.
                using (var msg = new MailMessage())
                {
                    msg.From = new MailAddress(user, brand + " Website");
                    msg.To.Add(to);
                    msg.ReplyToList.Add(new MailAddress(email, name));
                    msg.Subject = "New enquiry: " + name + (service.Length > 0 ? " - " + service : "");
                    SetBodies(msg, adminHtml, "New enquiry from " + name + " <" + email + ">\n\n" + message);
                    smtp.Send(msg);
                }

                // 2) Confirmation to the visitor. Deliberately does NOT echo their
                //    message, so the form can't relay arbitrary text to third parties.
                //    A failure here doesn't fail the request - the team already has it.
                try
                {
                    using (var msg = new MailMessage())
                    {
                        msg.From = new MailAddress(user, brand);
                        msg.To.Add(new MailAddress(email, name));
                        msg.Subject = "We've received your message - " + brand;
                        msg.Headers.Add("Auto-Submitted", "auto-replied");
                        SetBodies(msg, customerHtml,
                            "Hi " + first + ",\n\nThanks for contacting " + brand + ". We've received your message and will get back to you within one business day.\n\nEmail: " + to + "\nWhatsApp: " + waDisplay + "\n\nThe " + brand + " team\n" + site);
                        smtp.Send(msg);
                    }
                }
                catch (Exception ex) { Log(ctx, "customer reply to " + email, ex); }
            }
            Reply(ctx, 200, true, "Sent.");
        }
        catch (Exception ex)
        {
            Log(ctx, "team notification", ex);
            Reply(ctx, 502, false, "We couldn't send your message right now.");
        }
    }

    // Append failures to App_Data (never served by IIS). Logging must not throw.
    static void Log(HttpContext ctx, string what, Exception ex)
    {
        try
        {
            string line = DateTime.UtcNow.ToString("u") + " " + what + ": " + ex.GetType().Name + ": " + ex.Message +
                          (ex.InnerException != null ? " | " + ex.InnerException.Message : "") + Environment.NewLine;
            System.IO.File.AppendAllText(ctx.Server.MapPath("~/App_Data/contact-errors.log"), line);
        }
        catch (Exception) { }
    }

    static string H(string s) { return HttpUtility.HtmlEncode(s ?? ""); }

    static void Row(StringBuilder sb, string label, string value, bool raw = false)
    {
        if (string.IsNullOrEmpty(value)) return;
        sb.Append("<tr><td style=\"padding:10px 0;border-bottom:1px solid #27272a;color:#71717a;font-size:13px;width:110px;vertical-align:top\">" + label +
                  "</td><td style=\"padding:10px 0;border-bottom:1px solid #27272a;color:#fafafa;font-size:14px\">" + (raw ? value : H(value)) + "</td></tr>");
    }

    static string Button(string href, string text)
    {
        return "<table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" style=\"margin-top:28px\"><tr><td style=\"border-radius:999px;background:#f97316\">" +
               "<a href=\"" + H(href) + "\" style=\"display:inline-block;padding:12px 24px;color:#0a0a0a;font-weight:600;font-size:14px;text-decoration:none;border-radius:999px\">" + H(text) + " &rarr;</a></td></tr></table>";
    }

    // Table-based, inline-styled shell: renders in Gmail, Outlook and Apple Mail.
    static string Layout(string brand, string site, string heading, string content)
    {
        return "<!DOCTYPE html><html><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><meta name=\"color-scheme\" content=\"dark\"></head>" +
               "<body style=\"margin:0;padding:0;background:#09090b;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif\">" +
               "<table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style=\"background:#09090b;padding:32px 16px\"><tr><td align=\"center\">" +
               "<table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style=\"max-width:600px\">" +
               "<tr><td style=\"padding:0 0 24px\"><a href=\"" + H(site) + "\"><img src=\"" + H(site) + "/logo.png\" alt=\"" + H(brand) + "\" height=\"32\" style=\"height:32px;border:0;display:block\"></a></td></tr>" +
               "<tr><td style=\"background:#111113;border:1px solid #27272a;border-radius:16px;padding:36px 32px\">" +
               "<div style=\"height:3px;width:48px;background:#f97316;border-radius:3px;margin-bottom:24px\"></div>" +
               "<h1 style=\"margin:0 0 16px;font-size:24px;line-height:1.3;color:#fafafa;font-weight:600\">" + H(heading) + "</h1>" +
               content + "</td></tr>" +
               "<tr><td style=\"padding:24px 8px 0;text-align:center;color:#71717a;font-size:12px;line-height:1.6\">&copy; " + DateTime.UtcNow.Year + " " + H(brand) + " &middot; Colombo, Sri Lanka<br>" +
               "<a href=\"" + H(site) + "\" style=\"color:#a1a1aa;text-decoration:none\">" + H(site.Replace("https://", "")) + "</a></td></tr>" +
               "</table></td></tr></table></body></html>";
    }

    // Plain-text body plus an HTML alternative (deliverability + text-only clients).
    static void SetBodies(MailMessage msg, string html, string text)
    {
        msg.Body = text;
        msg.IsBodyHtml = false;
        msg.BodyEncoding = Encoding.UTF8;
        msg.SubjectEncoding = Encoding.UTF8;
        msg.AlternateViews.Add(AlternateView.CreateAlternateViewFromString(html, Encoding.UTF8, "text/html"));
    }

    // Strip CR/LF (header injection) and cap length.
    static string Clean(string s, int max)
    {
        s = Regex.Replace(s ?? "", @"[\r\n\t]+", " ").Trim();
        return s.Length > max ? s.Substring(0, max) : s;
    }

    class Counter { public int Count; }

    // Fixed window per IP: the counter object is inserted once with an absolute
    // expiry and incremented in place, so the window always resets.
    static bool RateLimited(HttpContext ctx, string ip)
    {
        string key = "contact:" + ip;
        lock (typeof(ContactHandler))
        {
            var c = ctx.Cache[key] as Counter;
            if (c == null)
            {
                c = new Counter();
                ctx.Cache.Insert(key, c, null, DateTime.UtcNow.Add(Window), Cache.NoSlidingExpiration);
            }
            if (c.Count >= MaxPerWindow) return true;
            c.Count++;
            return false;
        }
    }

    static void Reply(HttpContext ctx, int status, bool ok, string message)
    {
        ctx.Response.StatusCode = status;
        ctx.Response.TrySkipIisCustomErrors = true;
        ctx.Response.Write("{\"ok\":" + (ok ? "true" : "false") + ",\"message\":\"" + HttpUtility.JavaScriptStringEncode(message) + "\"}");
    }
}
