import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const dateSpan = await prisma.dateSpan.findUnique({
      where: { id },
      include: {
        students: true,
        forecastPrediction: true
      }
    });

    if (!dateSpan) {
      return NextResponse.json({ error: 'DateSpan not found' }, { status: 404 });
    }

    return NextResponse.json(dateSpan);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch dateSpan' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();
    const dateSpan = await prisma.dateSpan.update({
      where: { id },
      data: body,
      include: {
        students: true,
        forecastPrediction: true
      }
    });
    return NextResponse.json(dateSpan);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update dateSpan' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    await prisma.dateSpan.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'DateSpan deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete dateSpan' }, { status: 500 });
  }
}
