import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const teacher = await prisma.teacher.findUnique({
      where: { id },
      include: {
        user: true,
        lessons: true
      }
    });

    if (!teacher) {
      return NextResponse.json({ error: 'Teacher not found' }, { status: 404 });
    }

    return NextResponse.json(teacher);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch teacher' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();
    const teacher = await prisma.teacher.update({
      where: { id },
      data: body,
      include: { user: true }
    });
    return NextResponse.json(teacher);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update teacher' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    await prisma.teacher.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete teacher' }, { status: 500 });
  }
}
