import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const equipment = await prisma.equipment.findMany({
      include: {
        kite: true,
        bar: true,
        board: true,
        session: true
      }
    });
    return NextResponse.json(equipment);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch equipment' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const equipment = await prisma.equipment.create({
      data: body,
      include: {
        kite: true,
        bar: true,
        board: true,
        session: true
      }
    });
    return NextResponse.json(equipment, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create equipment' }, { status: 500 });
  }
}
