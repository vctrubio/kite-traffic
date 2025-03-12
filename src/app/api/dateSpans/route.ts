import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const dateSpans = await prisma.dateSpan.findMany({
      include: {
        students: true,
        forecastPrediction: true
      }
    });
    return NextResponse.json(dateSpans);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch dateSpans' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const dateSpan = await prisma.dateSpan.create({
      data: body,
      include: {
        students: true,
        forecastPrediction: true
      }
    });
    return NextResponse.json(dateSpan, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create dateSpan' }, { status: 500 });
  }
}
