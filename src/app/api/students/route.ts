import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const students = await prisma.student.findMany({
      include: {
        user: true,
        dateSpans: true,
        lessons: true,
        bookings: true
      }
    });
    return NextResponse.json(students);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const student = await prisma.student.create({
      data: body,
      include: { user: true }
    });
    return NextResponse.json(student, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create student' }, { status: 500 });
  }
}
