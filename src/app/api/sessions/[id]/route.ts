import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const session = await prisma.session.findUnique({
      where: { id },
      include: {
        bookings: true,
        lessons: true,
        equipments: true,
        forecast: true
      }
    });

    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    return NextResponse.json(session);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch session' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();
    const session = await prisma.session.update({
      where: { id },
      data: body,
      include: {
        bookings: true,
        lessons: true,
        forecast: true
      }
    });
    return NextResponse.json(session);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update session' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    await prisma.session.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Session deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete session' }, { status: 500 });
  }
}
