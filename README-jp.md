# nextjs_blog_with_git_pat

![Next.js](https://img.shields.io/badge/14.2.5-Next.js-000000.svg?logo=next.js&style=popout)
![TypeScript](https://img.shields.io/badge/-Typescript-007ACC.svg?logo=typescript&style=popout)
![Tailwind CSS](https://img.shields.io/badge/-Tailwind%20CSS-fff.svg?logo=tailwindcss&style=popout)
![GitHub API](https://img.shields.io/badge/-GitHub%20API-181717.svg?logo=github&style=popout)
![pnpm](https://img.shields.io/badge/-pnpm-fff.svg?logo=pnpm&style=popout)

## 概要

他のリポジトリの指定されたフォルダから`.md`を取得し、ブログとしてページを動的に構築します。

## Development環境下の開発

最初に不足するパッケージをインストールします

```bash
pnpm i
```

次に、開発環境を実行します

```bash
pnpm dev
```

## 環境変数

ローカル環境(`.env.local`)で次の環境変数をセットしてください。

- GIT_USERNAME: 対象ユーザー名
- GIT_REPO: 対象リポジトリ名
- GIT_POSTS_DIR: 対象リポジトリのMDファイルがあるフォルダ
- GIT_IMAGES_DIR: 対象リポジトリの画像フォルダ
- GIT_TOKEN: GitHub API (PAT) トークン
- AUTH_GITHUB_ID: GitHub OAuthアプリのクライアントID
- AUTH_GITHUB_SECRET: GitHub OAuthアプリのクライアントシークレット
- AUTH_GITHUB_ALLOWED_USERS: サイトにアクセスできるGitHubユーザー名のカンマ区切りホワイトリスト（未設定時は`GIT_USERNAME`を利用）
- AUTH_SECRET: NextAuth用のシークレット
- NEXT_PUBLIC_RECAPTCHA_SITE_KEY: reCAPTCHAのサイトキー
- RECAPTCHA_SECRET_KEY: reCAPTCHAのシークレットキー
- GTM_ID: Google Tag Manager

公開URLも`.env.production`で変更してください

### ブログ用リポジトリの例

```tree:記事のディレクトリ構造

isirmt/example_blog_posts

├── posts/
│   ├── [シリーズ名]/
│   │   ├── (meta.json)
│   │   ├── 1.md
│   │   ├── 2.md
│   │   └── ...
│   └── 記事名.md
└── img/
    ├── [任意]
    └── 任意
```

この場合は環境変数を次のようにセットします。

- GIT_USERNAME=isirmt
- GIT_REPO=example_blog_posts
- GIT_POSTS_DIR=posts
- GIT_IMAGES_DIR=img

また、`/src/static/constant.ts`も必要に応じて変更してください

## ビルド

次を実行します。

```bash
pnpm build
```

```bash
pnpm start
```
