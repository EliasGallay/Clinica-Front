import { cookies } from 'next/headers';
import { ACCESS_COOKIE, REFRESH_COOKIE } from './auth';
import { NextResponse } from 'next/server';

export type ValidationResult = {
  accessToken: string;
  refreshToken: string;
};

export const validate = async (request: Request): Promise<ValidationResult | NextResponse> => {
  const jar = await cookies();
  const accessToken = jar.get(ACCESS_COOKIE)?.value;
  const refreshToken = jar.get(REFRESH_COOKIE)?.value;
  if (!accessToken || !refreshToken) {
    const baseUrl = request.url.split('/').slice(0, 3).join('/');
    const url = new URL("/", baseUrl); // ✅ URL absoluta
    return NextResponse.redirect(url);
  }

  return { accessToken, refreshToken };
};
