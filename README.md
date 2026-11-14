This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Contact form (SMTP)

The site is a static export, so the form on `/contact` (and in the footer) POSTs to
`public/api/contact.ashx` — an ASP.NET handler that IIS on SmarterASP runs and that
sends two HTML emails over SMTP: an enquiry notification to `CONTACT_TO`, and a
confirmation to the visitor (which deliberately does not repeat their message, so the
form cannot relay arbitrary text). It has a honeypot field and a per-IP limit
(5 per 10 minutes).

SMTP settings are read from `App_Data/smtp.config` (via `<appSettings file=…>` in
`public/web.config`). The SmarterASP deploy workflow writes that file from these
GitHub repository secrets — never commit credentials:

| Secret       | Example                    |
| ------------ | -------------------------- |
| `SMTP_HOST`  | `mail5019.site4now.net`    |
| `SMTP_PORT`  | `587` (default)            |
| `SMTP_USER`  | `info@felinnlabs.com`      |
| `SMTP_PASS`  | mailbox password           |
| `CONTACT_TO` | optional; defaults to `SMTP_USER` |

On `next dev` and GitHub Pages the handler doesn't exist, so the form shows an error
with a mailto fallback.
