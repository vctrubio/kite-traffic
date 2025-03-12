import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const teachers = await prisma.teacher.findMany({
      include: {
        user: true,
        lessons: true
      }
    });
    return NextResponse.json(teachers);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch teachers' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const teacher = await prisma.teacher.create({
      data: body,
      include: { user: true }
    });
    return NextResponse.json(teacher, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create teacher' }, { status: 500 });
  }
}
