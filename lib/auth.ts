import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        await dbConnect();
        
        // Check if user email is admin
        const adminEmail = process.env.ADMIN_EMAIL;
        
        // Debug logging
        console.log('=== SIGNIN DEBUG START ===');
        console.log('User email:', user.email);
        console.log('User email type:', typeof user.email);
        console.log('User email length:', user.email?.length);
        console.log('Admin email:', adminEmail);
        console.log('Admin email type:', typeof adminEmail);
        console.log('Admin email length:', adminEmail?.length);
        console.log('Emails match:', user.email === adminEmail);
        console.log('User email trimmed:', user.email?.trim());
        console.log('Admin email trimmed:', adminEmail?.trim());
        console.log('=========================');
        
        if (user.email !== adminEmail) {
          console.error('❌ Access denied: Email mismatch');
          console.error('Expected:', adminEmail);
          console.error('Received:', user.email);
          return false; // Only admin can sign in
        }

        console.log('✅ Email check passed, saving user...');

        try {
          const existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            console.log('Creating new user in database...');
            await User.create({
              email: user.email,
              name: user.name,
              googleId: account.providerAccountId,
              image: user.image,
              role: 'admin',
            });
            console.log('✅ User created successfully');
          } else {
            console.log('✅ User already exists');
          }

          console.log('✅ SignIn successful');
          return true;
        } catch (error) {
          console.error('❌ Error saving user:', error);
          return false;
        }
      }
      return false;
    },
    async jwt({ token, user, account }) {
      // Debug logging
      console.log('=== JWT CALLBACK ===');
      console.log('Token:', token);
      console.log('User:', user);
      console.log('Account:', account);
      
      if (user) {
        token.email = user.email;
        token.name = user.name;
        token.role = 'admin';
        console.log('✅ JWT created with user data');
      }
      
      console.log('Final token:', token);
      console.log('==================');
      return token;
    },
    async session({ session, token }) {
      console.log('=== SESSION CALLBACK ===');
      console.log('Session:', session);
      console.log('Token:', token);
      
      if (session?.user && token) {
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.role = 'admin';
        console.log('✅ Session populated from token');
      }
      
      console.log('Final session:', session);
      console.log('======================');
      return session;
    },
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
