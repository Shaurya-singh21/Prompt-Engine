
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import DBconnect from "@/lib/dbConnect";
import userM from "@/models/user_model";


export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    
  ],

  // 1. Set session strategy to JWT
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60 //24 hours in seconds
  },
  secret: process.env.NEXT_AUTH_SECRET,
  callbacks: {
    async signIn({ profile }) {
      await DBconnect();
      try {
        //check if user already exists
        const userE = await userM.findOne({
          email: profile.email,
        });
        // console.log(userE)
        //if not create one
        if (!userE) {
          const newUser = await userM.create({
            email: profile.email,
            username: profile.name,
            image: profile.picture,
          });
          console.log(newUser);
        }

        return true;
      }
      catch (err) {
        console.log(err);
        return false;
      }
    },
    // 3. The jwt callback adds the user's DB ID to the token
    async jwt({ token }) {
      // Find the user in the database to get their ID
      await DBconnect();
      const userInDb = await userM.findOne({ email: token.email });
      // Add the ID to the token object
      token.id = userInDb._id.toString();
      return token;
    },
    // 4. The session callback gets the ID from the token
    async session({ session, token }) {
      // The token now has the ID, so we can add it to the session
      // No database call is needed here!
      if (token) {
        session.user.id = token.id;
      }
   
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 
