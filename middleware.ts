import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = ['/', '/auth/login', '/auth/register', '/auth/forgot-password'];
  
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // API routes authentication
  if (pathname.startsWith('/api/')) {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Add user info to headers for API routes
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', payload.userId);
    requestHeaders.set('x-user-role', payload.role);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // Protected dashboard routes
  if (pathname.startsWith('/dashboard')) {
    const token = request.cookies.get('token')?.value;
    
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    // Role-based route protection
    const role = payload.role;
    
    if (pathname.startsWith('/dashboard/admin') && role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    
    if (pathname.startsWith('/dashboard/recruiter') && role !== 'recruiter') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    
    if (pathname.startsWith('/dashboard/candidate') && role !== 'candidate') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};