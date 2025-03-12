import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const student = await prisma.student.findUnique({
      where: { id },
      include: {
        user: true,
        dateSpans: true,
        lessons: true,
        bookings: true
      }
    });

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    return NextResponse.json(student);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch student' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();
    const student = await prisma.student.update({
      where: { id },
      data: body,
      include: { user: true }
    });
    return NextResponse.json(student);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update student' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    await prisma.student.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Student deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete student' }, { status: 500 });
  }
}
