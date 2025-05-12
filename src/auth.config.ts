// import bcrypt from "bcryptjs";
// import GitHub from "next-auth/providers/github";
// import Google from "next-auth/providers/google";
// import Credentials from "next-auth/providers/credentials";

// import { LoginSchema } from "@/services/authenticate-service/schemas";
// import { getUserByEmail } from "@/services/authenticate-service/data/user";

// export const authOptions = {
//   providers: [
//     Google({
//       clientId: process.env.GOOGLE_CLIENT_ID || "",
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
//     }),
//     GitHub({
//       clientId: process.env.GITHUB_CLIENT_ID || "",
//       clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
//     }),
//     Credentials({
//       async authorize(credentials) {
//         const validatedFields = LoginSchema.safeParse(credentials);

//         if (validatedFields.success) {
//           const { email, password } = validatedFields.data;
//           const user = await getUserByEmail(email);
//           if (!user || !user.password) return null;

//           const passwordsMatch = await bcrypt.compare(password, user.password);
//           if (passwordsMatch) return user;
//         }

//         return null;
//       },
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//     }),
//   ],
// };

// export default authOptions;

import bcrypt from "bcryptjs";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

import { LoginSchema } from "@/services/authenticate-service/schemas";
import { getUserByEmail } from "@/services/authenticate-service/data/user";

export const authConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
    Credentials({
      async authorize(credentials) {
        const validated = LoginSchema.safeParse(credentials);
        if (!validated.success) return null;

        const { email, password } = validated.data;
        const user = await getUserByEmail(email);
        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(password, user.password);
        return isValid ? user : null;
      },
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
    }),
  ],
};
