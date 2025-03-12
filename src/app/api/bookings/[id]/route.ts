import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        student: {
          include: { user: true }
        },
        payment: true,
        session: true
      }
    });

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    return NextResponse.json(booking);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch booking' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();
    const booking = await prisma.booking.update({
      where: { id },
      data: body,
      include: {
        student: true,
        payment: true,
        session: true
      }
    });
    return NextResponse.json(booking);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    await prisma.booking.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete booking' }, { status: 500 });
  }
}
