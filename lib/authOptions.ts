import { dbConnect } from "@/lib/dbConnect";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/User";

export const authOptions: any = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials: any) {
        try {
          await dbConnect();
          const user = await User.findOne({ email: credentials.email });
          if (!user) return null;
          const passwordMatch = await bcrypt.compare(
            credentials?.password,
            user.password
          );
          if (!passwordMatch) return null;
          if (user.isVerified === false) return null;

          return user;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 3600,
  },

  callbacks: {
    jwt({ token, user }: any) {
      if (user) {
        return { ...token, role: user.role, id: user._id };
      }
      return token;
    },
    session: ({ session, token, user }: any) => {
      return {
        ...session,
        user: {
          ...session.user,
          role: token.role,
          id: token.id,
        },
        expires: Date,
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};
