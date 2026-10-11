// Prefix a /public file path with the deploy base path (e.g. "/new-company-web"
// on GitHub Pages). next/image does not add basePath to string `src` values.
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
