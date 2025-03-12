import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const sessions = await prisma.session.findMany({
      include: {
        bookings: true,
        lessons: true,
        equipments: true,
        forecast: true
      }
    });
    return NextResponse.json(sessions);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch sessions' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const session = await prisma.session.create({
      data: body,
      include: {
        bookings: true,
        lessons: true,
        forecast: true
      }
    });
    return NextResponse.json(session, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create session' }, { status: 500 });
  }
}
