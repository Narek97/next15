import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    // Called whenever a user signs in
    async signIn({ user, account, profile }) {
      return true; // Return true to allow sign in, or false to deny
    },

    // Called whenever a session is checked (e.g., every page load)
    async session({ session, token, user }) {
      // Add custom data to session object
      session.user.id = token.sub;
      session.user.barev = 'barev';
      return session; // The modified session object
    },

    // Called whenever a JWT token is created or updated
    async jwt({ token, user, account, profile }) {
      // Add custom claims to the token
      if (user) {
        token.id = user.id;
      }
      return token; // The modified token object
    },

    // Called when redirecting after successful sign-in
    async redirect({ url, baseUrl }) {
      return baseUrl; // Customize where the user is redirected to
    },
  },
});

export { handler as GET, handler as POST };
