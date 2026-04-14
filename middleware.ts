import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAdminPath = req.nextUrl.pathname.startsWith('/admin');
    const isLoginPage = req.nextUrl.pathname === '/admin/login';

    // Debug logging
    console.log('=== MIDDLEWARE DEBUG ===');
    console.log('Path:', req.nextUrl.pathname);
    console.log('Token exists:', !!token);
    console.log('Token:', token);
    console.log('Is admin path:', isAdminPath);
    console.log('Is login page:', isLoginPage);
    console.log('=======================');

    // If trying to access admin pages (except login) without auth, redirect to login
    if (isAdminPath && !isLoginPage && !token) {
      console.log('❌ Redirecting to login: no token');
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }

    // If already logged in and trying to access login page, redirect to dashboard
    if (isLoginPage && token) {
      console.log('✅ Redirecting to dashboard: already logged in');
      return NextResponse.redirect(new URL('/admin/dashboard', req.url));
    }

    console.log('✅ Allowing access');
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Debug logging
        console.log('=== AUTHORIZED CALLBACK ===');
        console.log('Path:', req.nextUrl.pathname);
        console.log('Token exists:', !!token);
        console.log('Token:', token);
        
        // Allow access to login page without token
        if (req.nextUrl.pathname === '/admin/login') {
          console.log('✅ Allowing login page');
          return true;
        }
        // For other admin routes, require token
        if (req.nextUrl.pathname.startsWith('/admin')) {
          console.log(token ? '✅ Token present' : '❌ Token missing');
          return !!token;
        }
        console.log('✅ Non-admin route');
        return true;
      },
    },
  }
);

export const config = {
  matcher: [], // TEMPORARILY DISABLED
};
