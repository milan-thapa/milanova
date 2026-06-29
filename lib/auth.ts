import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import authConfig from "./auth.config"

// Get admin emails from environment variable (comma-separated)
const ADMIN_EMAILS = process.env.ADMIN_EMAILS?.split(',').map(e => e.trim().toLowerCase()) || []

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  ...authConfig,
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id
        
        // If user is just signing in, check role
        let role = user.role;
        const isAdmin = user.email && ADMIN_EMAILS.includes(user.email.toLowerCase());
        if (!role && isAdmin) {
          role = 'ADMIN';
        }
        token.role = role || "USER";
      }
      
      if (trigger === "update" && session?.user) {
        token.role = session.user.role;
      }

      // Always fetch latest role from database to ensure it's current
      if (token.id) {
        try {
          const dbUser = await prisma.user.findUnique({
            where: { id: token.id as string },
            select: { role: true }
          })
          if (dbUser) {
            token.role = dbUser.role
          }
        } catch (error) {
          // If database fetch fails, keep existing role
        }
      }
      
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = (token.role as string) || "USER"
      }
      return session
    },
  },
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      // Log sign in events for monitoring
      if (process.env.NODE_ENV === 'production') {
        // In production, you might want to log this to your monitoring service
        console.log(`User signed in: ${user?.email}, isNewUser: ${isNewUser}`)
      }
    },
    async createUser({ user }) {
      // Automatically assign admin role if email is whitelisted
      if (user.id && user.email && ADMIN_EMAILS.includes(user.email.toLowerCase())) {
        await prisma.user.update({
          where: { id: user.id },
          data: { role: 'ADMIN' },
        })
      }
    }
  },
})
