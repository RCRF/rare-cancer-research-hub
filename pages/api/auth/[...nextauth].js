import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { fetchAdminStatus } from "@/hooks/api";

export default NextAuth({
  providers: [

  ],
  secret: process.env.JWT_SECRET,
  callbacks: {

  },
});
