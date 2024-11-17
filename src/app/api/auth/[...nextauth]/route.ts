import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

const baseURL = process.env.NEXTAUTH_URL + 'api/login';

interface User {
  email: string;
  password: string;
}

const handler = NextAuth({
  debug: true,
  providers: [
    {
      id: 'mywebpage', // Custom provider identifier
      name: 'MyProvider',
      type: 'oauth', // OAuth2 type
      authorization: {
        url: 'https://www.questionpro.com/a/oauth/authorize', // OAuth2 authorization URL
        params: {
          redirect_uri: 'localhost:3000/api/auth/callback/mywebpage',
        },
      },
      token: {
        url: 'http://localhost:3000/api/token', // OAuth2 token URL
        async request(context) {
          const { code } = context.params;

          const body = { code };
          try {
            const response = await fetch('http://localhost:3000/api/token', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(body),
            });

            // Check if the response is OK
            if (!response.ok) {
              throw new Error(`Failed to fetch token: ${response.statusText}`);
            }

            const data = await response.json(); // Parse the response as JSON

            if (!data.access_token) {
              throw new Error('access_token not present in TokenSet');
            }

            return {
              tokens: {
                access_token: data.access_token,
                token_type: data.token_type,
                expires_in: data.expires_in,
              },
            };
          } catch (error) {
            console.error('Error during token exchange:', error);
            throw error; // Rethrow the error for further handling
          }
        },
      },
      userinfo: 'http://localhost:3000/api/userinfo', // OAuth2 userinfo URL
      clientId: 'wyfbfmkwaxjaelytosyy', // Your OAuth2 Client ID
      clientSecret: 'wyfbfmkwaxjaelytosyy',
      profile(profile) {
        // Map the user profile from the external provider to NextAuth format
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.picture || null,
        };
      },
    },

    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Email...' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        // Docs: https://next-auth.js.org/configuration/providers/credentials
        const requestBody = {
          email: credentials.email,
          password: credentials.password,
        };
        const res = await fetch(baseURL, {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: { 'Content-Type': 'application/json' },
        });
        const resData = await res.json();

        if (
          resData.status === 400 ||
          resData.status === 401 ||
          resData.status === 403 ||
          resData.status === 500
        ) {
          return null;
        }
        if (resData.status === 200 || resData.status === 201) {
          return resData;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/en/login', // Custom sign-in page (optional)
    error: '/en/login', // Custom error page (optional)
  },
  session: {
    strategy: 'jwt',
  },
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
      return url.startsWith(baseUrl) ? url : baseUrl;
      // return baseUrl; // Customize where the user is redirected to
    },
  },
});

export { handler as GET, handler as POST };
