import { NextResponse } from 'next/server';
import { beUrl } from '@/lib/be';

export async function GET() {
  const beRes = await fetch(beUrl('/modules'), {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!beRes.ok) {
    const err = await beRes.json().catch(() => ({}));
    return NextResponse.json(
      { message: err?.message ?? 'Módulos no disponibles' },
      { status: beRes.status }
    );
  }

  const data = await beRes.json();

  return data;
}
