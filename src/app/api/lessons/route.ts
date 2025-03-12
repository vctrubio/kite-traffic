import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const lessons = await prisma.lesson.findMany({
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
    return NextResponse.json(lessons);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch lessons' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Extract connected relations that need special handling
    const { students, ...lessonData } = body;
    
    const lesson = await prisma.lesson.create({
      data: {
        ...lessonData,
        students: students ? {
          connect: students.map((id: number) => ({ id }))
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
    
    return NextResponse.json(lesson, { status: 201 });
  } catch (error) {
    console.error("Error creating lesson:", error);
    return NextResponse.json({ error: 'Failed to create lesson' }, { status: 500 });
  }
}
