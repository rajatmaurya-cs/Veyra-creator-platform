import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
  async signIn({ user }) {

    try {

      console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/google`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            name: user.name,
            email: user.email,
            avatar: user.image,
          }),
        }
      );

      console.log("STATUS :", response.status);

      const data = await response.text();

      console.log("DATA :", data);

      return true;

    } catch (error) {

      console.log("FULL ERROR :", error);

      return false;
    }
  },
},
});

export { handler as GET, handler as POST };