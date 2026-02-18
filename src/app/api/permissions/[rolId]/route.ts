import { NextResponse } from 'next/server';
import { fetchBe } from '@/lib/fetchBe';
import { validate, ValidationResult } from '@/lib/validate';
import { FilterParams } from '@/types/api/FilterParams';

interface PermissionParams extends FilterParams {
  rolId: string;
}

export async function GET(request: Request, { params }: { params: PermissionParams }) {
  const { accessToken } = (await validate(request)) as ValidationResult;
  const { rolId } = await params;

  try {
    const beRes = await fetchBe(`/roles/${rolId}/permissions`, 'GET', accessToken);

    if (!beRes.ok) {
      const err = await beRes.json().catch(() => ({}));
      return NextResponse.json(
        { message: err?.message ?? 'Permisos no disponibles' },
        { status: beRes.status }
      );
    }

    const data = await beRes.json();

    return NextResponse.json(data.items, { status: 200 });
  } catch (error) {
    console.error('Error al obtener los permisos del rol:', error);
    return NextResponse.json({ message: 'Error al obtener los permisos del rol' }, { status: 500 });
  }
}
