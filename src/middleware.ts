import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ACCESS_COOKIE } from '@/lib/auth';

export function middleware(req: NextRequest) {
  const hasToken = Boolean(req.cookies.get(ACCESS_COOKIE)?.value);
  console.log('🚀 ~ middleware ~ hasToken:', hasToken);

  if (hasToken && req.nextUrl.pathname === '/') {
    const url = req.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // Aplica el middleware solo a rutas que empiecen con /dashboard (ajústalo a tus rutas protegidas)
  matcher: ['/', '/dashboard/:path*'],
};
