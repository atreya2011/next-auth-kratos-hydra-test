# Next.js Starter Template with TailwindCSS, TypeScript et al

This repo contains an opinionated starter template for Next.js pre-installed and configured with the following:

- TailwindCSS for styling: <https://tailwindcss.com/docs>
- ESLint for code linting: <https://eslint.org>
- Prettier for code formating: <https://prettier.io/>
- Husky for handling git hooks: <https://typicode.github.io/husky/#/>
- Lint-Staged for formatting, linting & type-checking staged files: <https://github.com/okonet/lint-staged>
- Commitizen & respective plugins for linting commits: <https://github.com/commitizen>

## Getting Started

Run the following command to get started with a new project using this template:

```bash
npx create-next-app [project-name] -e https://github.com/atreya2011/next-tailwind-ts-template
# or
yarn create next-app [project-name] -e https://github.com/atreya2011/next-tailwind-ts-template
```

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## Caveats

- Any projected created using this starter template will not have git initialized as its source control and therefore husky & lint-staged will not work out of the box.
- To make husky & lint-staged work after initializing an empty git repository, run the following command:

```bash
npm rebuild
# or
yarn --force
# or
npm rebuild --update-binary # (if yarn --force doesn't work)
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
