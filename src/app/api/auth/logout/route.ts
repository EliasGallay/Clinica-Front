import { NextResponse } from 'next/server';
import { ACCESS_COOKIE, REFRESH_COOKIE } from '@/lib/auth';
import { fetchBe } from '@/lib/fetchBe';
import { validate, ValidationResult } from '@/lib/validate';

async function logout(accessToken: string) {
  return fetchBe('/auth/logout', 'POST', accessToken);
}

export async function POST(request: Request) {
  const { refreshToken } = (await validate(request)) as ValidationResult;

  await logout(refreshToken);

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ACCESS_COOKIE, '', { path: '/', maxAge: 0 });
  res.cookies.set(REFRESH_COOKIE, '', { path: '/', maxAge: 0 });
  return res;
}
