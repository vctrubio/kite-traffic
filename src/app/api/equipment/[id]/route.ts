import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const equipment = await prisma.equipment.findUnique({
      where: { id },
      include: {
        kite: true,
        bar: true,
        board: true,
        session: true
      }
    });

    if (!equipment) {
      return NextResponse.json({ error: 'Equipment not found' }, { status: 404 });
    }

    return NextResponse.json(equipment);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch equipment' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();
    const equipment = await prisma.equipment.update({
      where: { id },
      data: body,
      include: {
        kite: true,
        bar: true,
        board: true,
        session: true
      }
    });
    return NextResponse.json(equipment);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update equipment' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    await prisma.equipment.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Equipment deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete equipment' }, { status: 500 });
  }
}
