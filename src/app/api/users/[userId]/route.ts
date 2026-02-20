import { fetchBe } from '@/lib/fetchBe';
import { validate, ValidationResult } from '@/lib/validate';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  const { accessToken } = (await validate(request)) as ValidationResult;
  const { userId } = await params;

  try {
    const beRes = await fetchBe(`/users/${userId}`, 'GET', accessToken);
    const data = await beRes.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    return NextResponse.json({ message: 'Error al obtener el usuario' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { userId: string } }) {
  const { accessToken } = (await validate(request)) as ValidationResult;
  const { userId } = await params;

  try {
    await fetchBe(`/users/${userId}`, 'DELETE', accessToken);
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    return NextResponse.json({ message: 'Error al eliminar el usuario' }, { status: 500 });
  }
}
