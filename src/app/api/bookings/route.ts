import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        student: {
          include: { user: true }
        },
        payment: true,
        session: true
      }
    });
    return NextResponse.json(bookings);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const booking = await prisma.booking.create({
      data: body,
      include: {
        student: true,
        payment: true,
        session: true
      }
    });
    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}
