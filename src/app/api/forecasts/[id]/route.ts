import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const forecast = await prisma.forecast.findUnique({
      where: { id },
      include: {
        sessions: true,
        forecastPredictions: {
          include: {
            dateSpan: true
          }
        }
      }
    });

    if (!forecast) {
      return NextResponse.json({ error: 'Forecast not found' }, { status: 404 });
    }

    return NextResponse.json(forecast);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch forecast' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();
    const forecast = await prisma.forecast.update({
      where: { id },
      data: body,
      include: {
        sessions: true,
        forecastPredictions: true
      }
    });
    return NextResponse.json(forecast);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update forecast' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    await prisma.forecast.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Forecast deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete forecast' }, { status: 500 });
  }
}
