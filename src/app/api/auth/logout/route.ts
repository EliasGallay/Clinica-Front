import { NextResponse } from 'next/server';
import { ACCESS_COOKIE, REFRESH_COOKIE } from '@/lib/auth';
import { cookies } from 'next/headers';
import { beUrl } from '@/lib/be';

async function logout(accessToken: string) {
  return fetch(beUrl('/auth/logout'), {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: 'no-store',
  });
}

export async function POST() {
  const jar = await cookies();
  const refreshToken = jar.get(REFRESH_COOKIE)?.value;

  if (!refreshToken) {
    return NextResponse.json({ message: 'No autenticado' }, { status: 401 });
  }

  await logout(refreshToken);

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ACCESS_COOKIE, '', { path: '/', maxAge: 0 });
  res.cookies.set(REFRESH_COOKIE, '', { path: '/', maxAge: 0 });
  return res;
}
