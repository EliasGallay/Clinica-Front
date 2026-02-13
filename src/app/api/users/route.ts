import { NextResponse } from 'next/server';
import { fetchBe } from '@/lib/fetchBe';
import { ACCESS_COOKIE } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function GET() {
  const jar = await cookies();
  const accessToken = jar.get(ACCESS_COOKIE)?.value;
  if (!accessToken) {
    return NextResponse.json({ message: 'No autenticado' }, { status: 401 });
  }
  const beRes = await fetchBe('/users/all', 'GET', accessToken);
  if (!beRes.ok) {
    const err = await beRes.json().catch(() => ({}));
    return NextResponse.json(
      { message: err?.message ?? 'Usuarios no disponibles' },
      { status: beRes.status }
    );
  }

  const data = await beRes.json();

  return NextResponse.json(data, { status: 200 });
}
