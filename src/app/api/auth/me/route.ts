import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { beUrl } from '@/lib/be';
import { ACCESS_COOKIE, REFRESH_COOKIE, ACCESS_MAX_AGE, REFRESH_MAX_AGE } from '@/lib/auth';
import { LoginResponse } from '@/types/login/LoginResponse';

async function fetchMe(accessToken: string) {
  return fetch(beUrl('/users/me'), {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: 'no-store',
  });
}

async function refreshTokens(refreshToken: string) {
  return fetch(beUrl('/auth/refresh'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });
}

export async function GET() {
  const jar = await cookies();
  const accessToken = jar.get(ACCESS_COOKIE)?.value;
  const refreshToken = jar.get(REFRESH_COOKIE)?.value;

  if (!accessToken && !refreshToken) {
    return NextResponse.json({ message: 'No autenticado' }, { status: 401 });
  }

  // 1) probamos con access si existe
  if (accessToken) {
    const meRes = await fetchMe(accessToken);
    console.log('🚀 ~ GET ~ meRes:', meRes);
    if (meRes.ok) {
      const me = await meRes.json().catch(() => null);
      return NextResponse.json(me, { status: 200 });
    }
    if (meRes.status !== 401) {
      const err = await meRes.json().catch(() => ({}));
      return NextResponse.json(err, { status: meRes.status });
    }
    // si 401, intentamos refresh abajo
  }

  // 2) refresh
  if (!refreshToken) {
    return NextResponse.json({ message: 'Sesión expirada' }, { status: 401 });
  }

  const refreshRes = await refreshTokens(refreshToken);
  if (!refreshRes.ok) {
    const res = NextResponse.json({ message: 'Sesión expirada' }, { status: 401 });
    res.cookies.set(ACCESS_COOKIE, '', { path: '/', maxAge: 0 });
    res.cookies.set(REFRESH_COOKIE, '', { path: '/', maxAge: 0 });
    return res;
  }

  const tokens = (await refreshRes.json()) as LoginResponse;

  // 3) reintentar /me con el nuevo access
  const meRes2 = await fetchMe(tokens.token);
  const me2 = await meRes2.json().catch(() => null);

  const res = NextResponse.json(me2, { status: meRes2.status });

  // set cookies nuevas
  res.cookies.set(ACCESS_COOKIE, tokens.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: tokens.expiresIn ?? ACCESS_MAX_AGE,
  });

  res.cookies.set(REFRESH_COOKIE, tokens.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: tokens.rtk_dat_expires_at ?? REFRESH_MAX_AGE,
  });

  return res;
}
