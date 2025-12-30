# nextjs_blog_with_git_pat

![Next.js](https://img.shields.io/badge/14.2.5-Next.js-000000.svg?logo=next.js&style=popout)
![TypeScript](https://img.shields.io/badge/-Typescript-007ACC.svg?logo=typescript&style=popout)
![Tailwind CSS](https://img.shields.io/badge/-Tailwind%20CSS-fff.svg?logo=tailwindcss&style=popout)
![GitHub API](https://img.shields.io/badge/-GitHub%20API-181717.svg?logo=github&style=popout)
![pnpm](https://img.shields.io/badge/-pnpm-fff.svg?logo=pnpm&style=popout)

[日本語版README](/README-jp.md)

## Overview

This project dynamically builds pages as a blog by retrieving `.md` files from a specified folder in another repository.

## Development under the Development Environment

First, install the necessary packages.

```bash
pnpm i
```

Next, run the development environment.

```bash
pnpm dev
```

## Environment Variables

Set the following environment variables in your local environment (`.env.local`).

- GIT_USERNAME: Target username
- GIT_REPO: Target repository name
- GIT_POSTS_DIR: Folder in the target repository where the MD files are located
- GIT_IMAGES_DIR: Image folder in the target repository
- GIT_PROFILE_PATH: Path to the profile MD file in the target repository
- GIT_TOKEN: GitHub API (PAT) token
- NEXT_PUBLIC_RECAPTCHA_SITE_KEY: reCAPTCHA site key
- RECAPTCHA_SECRET_KEY: reCAPTCHA secret key
- GTM_ID: Google Tag Manager

You can also change the public URL in `.env.production`.

### Example of a Blog Repository

```tree:Directory structure for articles

isirmt/example_blog_posts

├── posts/
│   ├── [Series Name]/
│   │   ├── (meta.json)
│   │   ├── 1.md
│   │   ├── 2.md
│   │   └── ...
│   └── ArticleName.md
├── img/
│   ├── [Optional]
│   └── Optional
└── profile/
    └── index.md
```

In this case, set the environment variables as follows:

- GIT_USERNAME=isirmt
- GIT_REPO=example_blog_posts
- GIT_POSTS_DIR=posts
- GIT_IMAGES_DIR=img
- GIT_PROFILE_PATH=profile/index.md

Also, modify `/src/static/constant.ts` as needed.

## Build

Execute the following commands:

```bash
pnpm build
```

```bash
pnpm start
```
