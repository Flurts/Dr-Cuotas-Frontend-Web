import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }: any) {
      const token = account.id_token;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            query: `
            mutation HandleGoogleSignInUp($token: String!) {
              handleGoogleSignInUp(token: $token)
            }
          `,
            variables: { token },
          }),
        },
      );

      const result = await response.json();

      if (!result.data.handleGoogleSignInUp) {
        return false;
      }

      if (result.errors || !result.data.handleGoogleSignInUp) {
        return false;
      }

      return true;
    },
    async jwt({ token, account }: any) {
      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
      }
      return token;
    },
    async session({ session, token, account }: any) {
      session.accessToken = token.accessToken;
      session.idToken = token.idToken;
      return session;
    },
  },
};

export default NextAuth(authOptions);
