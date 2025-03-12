import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const lesson = await prisma.lesson.findUnique({
      where: { id },
      include: {
        session: true,
        feedback: true,
        confirmation: true,
        teacher: {
          include: { user: true }
        },
        students: {
          include: { user: true }
        }
      }
    });

    if (!lesson) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
    }

    return NextResponse.json(lesson);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch lesson' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();
    
    // Extract connected relations that need special handling
    const { students, ...lessonData } = body;
    
    const lesson = await prisma.lesson.update({
      where: { id },
      data: {
        ...lessonData,
        students: students ? {
          set: students.map((id: number) => ({ id }))
        } : undefined
      },
      include: {
        session: true,
        feedback: true,
        confirmation: true,
        teacher: true,
        students: true
      }
    });
    
    return NextResponse.json(lesson);
  } catch (error) {
    console.error("Error updating lesson:", error);
    return NextResponse.json({ error: 'Failed to update lesson' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    await prisma.lesson.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Lesson deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete lesson' }, { status: 500 });
  }
}
