import { NextResponse } from 'next/server';
import { fetchBe } from '@/lib/fetchBe';
import { validate, ValidationResult } from '@/lib/validate';

export async function GET(request: Request) {
  const { accessToken } = (await validate(request)) as ValidationResult;
  const beRes = await fetchBe('/modules', 'GET', accessToken);

  if (!beRes.ok) {
    const err = await beRes.json().catch(() => ({}));
    return NextResponse.json(
      { message: err?.message ?? 'Módulos no disponibles' },
      { status: beRes.status }
    );
  }

  const data = await beRes.json();

  return NextResponse.json(data, { status: 200 });
}
