import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding sample data...`);
  
  // Create users
  const user1 = await prisma.user.upsert({
    where: { email: 'student@example.com' },
    update: {},
    create: {
      email: 'student@example.com',
      name: 'Sample Student',
      status: 'active',
      password: 'password123',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'teacher@example.com' },
    update: {},
    create: {
      email: 'teacher@example.com',
      name: 'Sample Teacher',
      status: 'active',
      password: 'password123',
    },
  });

  const user3 = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      status: 'admin',
      password: 'admin123',
    },
  });

  // Create student profile
  const student = await prisma.student.create({
    data: {
      weight: 70,
      height: 175,
      level: 2,
      userId: user1.id,
    },
  });

  // Create teacher profile
  const teacher = await prisma.teacher.create({
    data: {
      userId: user2.id,
    },
  });

  // Create date spans
  const dateSpan1 = await prisma.dateSpan.create({
    data: {
      startDate: new Date('2023-07-01T09:00:00Z'),
      endDate: new Date('2023-07-01T12:00:00Z'),
      students: {
        connect: { id: student.id }
      }
    },
  });

  const dateSpan2 = await prisma.dateSpan.create({
    data: {
      startDate: new Date('2023-07-02T10:00:00Z'),
      endDate: new Date('2023-07-02T13:00:00Z'),
      students: {
        connect: { id: student.id }
      }
    },
  });

  // Create kite equipment
  const kite = await prisma.kite.create({
    data: {
      size: 12,
    },
  });

  // Create bar equipment
  const bar = await prisma.bar.create({
    data: {
      size: 56,
    },
  });

  // Create board equipment
  const board = await prisma.board.create({
    data: {
      size: 140,
    },
  });

  // Create session
  const session = await prisma.session.create({
    data: {
      date: new Date('2023-07-01T09:00:00Z'),
      time: '09:00-12:00',
    },
  });

  // Create equipment
  const equipment = await prisma.equipment.create({
    data: {
      comment: 'Standard setup for beginners',
      kiteId: kite.id,
      barId: bar.id,
      boardId: board.id,
      sessionId: session.id,
    },
  });

  // Create lesson
  const lesson = await prisma.lesson.create({
    data: {
      sessionId: session.id,
      teacherId: teacher.id,
      students: {
        connect: { id: student.id }
      }
    },
  });

  // Create booking
  const booking = await prisma.booking.create({
    data: {
      status: 1, // Confirmed status
      studentsId: student.id,
      sessionId: session.id,
      payment: {
        create: {
          price: 10000, // $100.00
        }
      }
    },
  });

  // Create forecast
  const forecast = await prisma.forecast.create({
    data: {
      sessions: {
        connect: { id: session.id }
      }
    },
  });

  // Create forecast prediction
  const forecastPrediction = await prisma.forecastPrediction.create({
    data: {
      knots: 18,
      authorOrModel: 'WindGuru',
      dateSpanId: dateSpan1.id,
      forecastId: forecast.id,
    },
  });

  console.log('Seeding completed!');
  console.log({
    users: [user1, user2, user3],
    student,
    teacher,
    dateSpans: [dateSpan1, dateSpan2],
    kite,
    bar,
    board,
    session,
    equipment,
    lesson,
    booking,
    forecast,
    forecastPrediction,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
