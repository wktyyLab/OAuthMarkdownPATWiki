import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

const allowedUsernames = (() => {
  const whitelist = process.env.AUTH_GITHUB_ALLOWED_USERS ?? '';
  const users = whitelist
    .split(',')
    .map((username) => username.trim().toLowerCase())
    .filter(Boolean);

  const fallbackUser = process.env.GIT_USERNAME?.trim().toLowerCase();
  if (fallbackUser) {
    users.push(fallbackUser);
  }

  return new Set(users);
})();

const isAllowedUser = (username?: string | null) => {
  if (!username) return false;
  if (allowedUsernames.size === 0) return true;

  return allowedUsernames.has(username.toLowerCase());
};

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID ?? process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET ?? process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    // eslint-disable-next-line no-unused-vars
    async jwt({ token, user, account, profile }) {
      if (profile) {
        const login = (profile as { login?: string }).login;
        if (login) {
          token.username = login.toLowerCase();
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token?.username) {
        session.user.id = token.username as string;
      }
      return session;
    },
    authorized({ auth }) {
      return isAllowedUser((auth?.user?.id as string | undefined) ?? null);
    },
  },
});
