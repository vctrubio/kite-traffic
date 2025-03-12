import { prisma } from "@/lib/prisma";
import Link from "next/link";

interface ModelCount {
  name: string;
  count: number;
  url: string;
}

async function getModelCounts(): Promise<ModelCount[]> {
  const modelCounts: ModelCount[] = [];
  
  // Users
  const userCount = await prisma.user.count();
  modelCounts.push({ name: "Users", count: userCount, url: "/api/users" });
  
  // Students
  const studentCount = await prisma.student.count();
  modelCounts.push({ name: "Students", count: studentCount, url: "/api/students" });
  
  // Teachers
  const teacherCount = await prisma.teacher.count();
  modelCounts.push({ name: "Teachers", count: teacherCount, url: "/api/teachers" });
  
  // Bookings
  const bookingCount = await prisma.booking.count();
  modelCounts.push({ name: "Bookings", count: bookingCount, url: "/api/bookings" });
  
  // Sessions
  const sessionCount = await prisma.session.count();
  modelCounts.push({ name: "Sessions", count: sessionCount, url: "/api/sessions" });
  
  // Lessons
  const lessonCount = await prisma.lesson.count();
  modelCounts.push({ name: "Lessons", count: lessonCount, url: "/api/lessons" });
  
  // DateSpans
  const dateSpanCount = await prisma.dateSpan.count();
  modelCounts.push({ name: "DateSpans", count: dateSpanCount, url: "/api/dateSpans" });
  
  // Equipment
  const equipmentCount = await prisma.equipment.count();
  modelCounts.push({ name: "Equipment", count: equipmentCount, url: "/api/equipment" });
  
  // Kites
  const kiteCount = await prisma.kite.count();
  modelCounts.push({ name: "Kites", count: kiteCount, url: "/api/kites" });
  
  // Bars
  const barCount = await prisma.bar.count();
  modelCounts.push({ name: "Bars", count: barCount, url: "/api/bars" });
  
  // Boards
  const boardCount = await prisma.board.count();
  modelCounts.push({ name: "Boards", count: boardCount, url: "/api/boards" });
  
  // Forecasts
  const forecastCount = await prisma.forecast.count();
  modelCounts.push({ name: "Forecasts", count: forecastCount, url: "/api/forecasts" });
  
  // Forecast Predictions
  const forecastPredictionCount = await prisma.forecastPrediction.count();
  modelCounts.push({ name: "Forecast Predictions", count: forecastPredictionCount, url: "/api/forecastPredictions" });
  
  // Payments
  const paymentCount = await prisma.payment.count();
  modelCounts.push({ name: "Payments", count: paymentCount, url: "/api/payments" });
  
  // Feedbacks
  const feedbackCount = await prisma.feedback.count();
  modelCounts.push({ name: "Feedbacks", count: feedbackCount, url: "/api/feedbacks" });
  
  // Lesson Confirmations
  const confirmationCount = await prisma.lessonConfirmation.count();
  modelCounts.push({ name: "Lesson Confirmations", count: confirmationCount, url: "/api/lessonConfirmations" });
  
  return modelCounts;
}

export default async function Home() {
  const modelCounts = await getModelCounts();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-4">KiteTraffic Database Dashboard</h1>
        <p className="text-gray-600">
          Overview of all database models and their current record counts
        </p>
        <div className="mt-4">
          <Link 
            href="/api-test" 
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Open API Test Interface
          </Link>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {modelCounts.map((model) => (
          <div 
            key={model.name}
            className="bg-white border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="p-5">
              <h2 className="font-semibold text-xl mb-2">{model.name}</h2>
              <div className="flex justify-between items-center">
                <div className="text-3xl font-bold text-blue-600">{model.count}</div>
                <div className="text-gray-500 text-sm">Total Records</div>
              </div>
              <div className="mt-4 flex space-x-2">
                <a 
                  href={model.url} 
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="text-sm text-blue-500 hover:text-blue-700 hover:underline"
                >
                  View API →
                </a>
                <Link 
                  href={`/api-test?endpoint=${encodeURIComponent(model.url)}`}
                  className="text-sm text-green-500 hover:text-green-700 hover:underline"
                >
                  Test API →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <footer className="mt-12 pt-6 border-t border-gray-200 text-center text-gray-600 text-sm">
        <p>KiteTraffic Database Management System</p>
        <p className="mt-1">Connected to Prisma Database</p>
      </footer>
    </div>
  );
}