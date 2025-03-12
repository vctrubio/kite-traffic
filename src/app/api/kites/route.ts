import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const kites = await prisma.kite.findMany({
      include: {
        equipment: true
      }
    });
    return NextResponse.json(kites);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch kites' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const kite = await prisma.kite.create({
      data: body,
      include: {
        equipment: true
      }
    });
    return NextResponse.json(kite, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create kite' }, { status: 500 });
  }
}
