# Next.js implementation using Ory Kratos + Hydra as a custom OAuth provider in Next-Auth

This repo uses the following:

- TailwindCSS for styling: <https://tailwindcss.com/docs>
- ESLint for code linting: <https://eslint.org>
- Prettier for code formating: <https://prettier.io/>
- Husky for handling git hooks: <https://typicode.github.io/husky/#/>
- Lint-Staged for formatting, linting & type-checking staged files: <https://github.com/okonet/lint-staged>
- Commitizen & respective plugins for linting commits: <https://github.com/commitizen>

## Getting Started

Switch to the `hydra-consent` branch:

```bash
git checkout hydra-consent
```

Make a copy of the `.env.local.example` file and rename it to `.env.local`:

```bash
cp .env.local.example .env.local
```

Run the following command to install all dependencies:

```bash
npm install
```

Create an OAuth Client using the following command:

```bash
curl -X POST 'http://localhost:4445/clients' \
  -H 'Content-Type: application/json' \
  --data-raw '{
    "client_id": "next-auth-test-client",
    "client_name": "Next Auth Test OAuth2 Client",
    "client_secret": "secret",
    "grant_types": ["authorization_code", "refresh_token"],
    "redirect_uris": ["http://localhost:3000/api/auth/callback/kratos-hydra"],
    "response_types": ["code", "id_token"],
    "scope": "openid offline",
    "token_endpoint_auth_method": "client_secret_basic",
    "metadata": {"registration":true}
  }'
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
