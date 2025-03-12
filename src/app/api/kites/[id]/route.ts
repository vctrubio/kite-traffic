import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const kite = await prisma.kite.findUnique({
      where: { id },
      include: {
        equipment: true
      }
    });

    if (!kite) {
      return NextResponse.json({ error: 'Kite not found' }, { status: 404 });
    }

    return NextResponse.json(kite);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch kite' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();
    const kite = await prisma.kite.update({
      where: { id },
      data: body,
      include: {
        equipment: true
      }
    });
    return NextResponse.json(kite);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update kite' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    await prisma.kite.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Kite deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete kite' }, { status: 500 });
  }
}
