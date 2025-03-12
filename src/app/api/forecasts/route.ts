import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const forecasts = await prisma.forecast.findMany({
      include: {
        sessions: true,
        forecastPredictions: {
          include: {
            dateSpan: true
          }
        }
      }
    });
    return NextResponse.json(forecasts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch forecasts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const forecast = await prisma.forecast.create({
      data: body,
      include: {
        sessions: true,
        forecastPredictions: true
      }
    });
    return NextResponse.json(forecast, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create forecast' }, { status: 500 });
  }
}
