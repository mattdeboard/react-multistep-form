# React Multistep Form

This repo exists as a reference utilization of my [`useFormStateMachine`](https://gist.github.com/mattdeboard/f5ff93d6f3db78aae3aaf50002bad154)
hook. I used Root's [quote builder](https://quote.joinroot.com/landing)
as the model application.

## Architecture

### `useFormStateMachine`

As mentioned above, this repo is meant to demonstrate usage of
`useFormStateMachine`. You can see that hook's invocation
[here](./src/app/quote-builder/layout.tsx#L22).

In fact, all of the logic for navigating through & submitting the form
live in that same module. This makes individual sub-forms (e.g.
[homeowner status](./src/app/quote-builder/homeowner/page.tsx),
[marital status](./src/app/quote-builder/maritalStatus/page.tsx), etc.)
extremely simple. This demonstrates the strength of
`useFormStateMachine` in separating the form's navigational concerns
from the data-gathering concerns of the form. Each sub-form in the
wizard is a straightforward collection of text and form fields, rather
than being ["complected"](https://www.youtube.com/watch?v=SxdOUGdseq4)
with all the conditional logic inherent in a multi-step form.

### Routing

This is a [Next.js](https://nextjs.org) project bootstrapped with
[`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

This application uses NextJS's [App
Router](https://nextjs.org/docs/app/building-your-application/routing).
I chose the App router, instead of the Pages router, because I prefer
the nested folder-based routing system. The Pages router would have been
fine, given the size & simplicity of this application. I simply prefer
the App router paradigm.

However, nearly all routing here is done client-side. All components are
client-side components (hence the `'use client'` declaration at the top
of each file).

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
