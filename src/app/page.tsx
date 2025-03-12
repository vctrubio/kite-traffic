import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-blue-600">KiteTraffic</div>
          </div>
          <div className="hidden md:flex space-x-8 text-gray-600">
            <a href="#features" className="hover:text-blue-600 transition">Features</a>
            <a href="#benefits" className="hover:text-blue-600 transition">Benefits</a>
            <a href="#testimonials" className="hover:text-blue-600 transition">Testimonials</a>
          </div>
          <div className="flex items-center space-x-4">
            <Link 
              href="/api-test" 
              className="hidden md:block px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
            >
              Try Demo
            </Link>
            <Link 
              href="/dashboard" 
              className="px-5 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition"
            >
              Log In
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-16 pb-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight mb-6">
                Manage Your Kite School With <span className="text-blue-600">Precision</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Streamline operations, delight students, and grow your business with the all-in-one kite school management platform.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Link 
                  href="/register" 
                  className="px-8 py-3 bg-blue-600 text-white text-center rounded-full text-lg font-medium hover:bg-blue-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Get Started Free
                </Link>
                <Link 
                  href="#demo-video" 
                  className="px-8 py-3 border border-gray-300 bg-white text-gray-700 text-center rounded-full text-lg font-medium hover:bg-gray-50 transition"
                >
                  Watch Demo
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="bg-gradient-to-r from-blue-400 to-teal-400 rounded-3xl p-2 shadow-2xl">
                <div className="bg-white rounded-2xl overflow-hidden">
                  <div className="relative h-[350px] w-full">
                    <Image 
                      src="/dashboard-preview.jpg" 
                      alt="KiteTraffic Dashboard Preview" 
                      fill
                      style={{objectFit: "cover"}}
                      className="rounded-t-2xl"
                      priority
                    />
                  </div>
                  <div className="p-6 bg-white">
                    <h3 className="font-semibold text-lg mb-2">Powerful Dashboard</h3>
                    <p className="text-gray-600">Track bookings, monitor student progress, and view forecasts in one place.</p>
                  </div>
                </div>
              </div>
              
              {/* Stats Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 w-48">
                <div className="text-sm text-gray-500">This month</div>
                <div className="text-2xl font-bold text-gray-800">324</div>
                <div className="text-green-600 text-sm font-medium">↑ 18% Bookings</div>
              </div>
              
              {/* Weather Floating Card */}
              <div className="absolute -top-6 -right-6 bg-white rounded-lg shadow-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="text-yellow-500 text-3xl">☀️</div>
                  <div>
                    <div className="text-xl font-bold">24°C</div>
                    <div className="text-blue-600">18 knots</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Trusted By Section */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto text-center">
          <p className="text-gray-500 uppercase text-sm font-medium tracking-wider mb-6">Trusted by kite schools worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
            <div className="text-gray-400 text-xl font-medium">KiteSurf Pro</div>
            <div className="text-gray-400 text-xl font-medium">WindRiders</div>
            <div className="text-gray-400 text-xl font-medium">OceanEdge</div>
            <div className="text-gray-400 text-xl font-medium">AirWave</div>
            <div className="text-gray-400 text-xl font-medium">KiteZone</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Everything You Need To Run Your Kite School</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From booking management to equipment tracking, we've got you covered with features designed specifically for kite schools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition">
              <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-4 text-2xl">
                📅
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Scheduling</h3>
              <p className="text-gray-600">
                Automatically match students with teachers based on availability, skill level, and weather conditions.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition">
              <div className="w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-4 text-2xl">
                📊
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-time Analytics</h3>
              <p className="text-gray-600">
                Track bookings, student progress, and teacher performance with powerful analytics and reports.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition">
              <div className="w-14 h-14 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center mb-4 text-2xl">
                🌤️
              </div>
              <h3 className="text-xl font-semibold mb-3">Weather Integration</h3>
              <p className="text-gray-600">
                Automatically fetch and analyze wind forecasts to plan perfect sessions for your students.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition">
              <div className="w-14 h-14 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-4 text-2xl">
                💬
              </div>
              <h3 className="text-xl font-semibold mb-3">Instant Notifications</h3>
              <p className="text-gray-600">
                Keep everyone informed with automated notifications for bookings, lesson changes, and ideal wind conditions.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition">
              <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4 text-2xl">
                🛠️
              </div>
              <h3 className="text-xl font-semibold mb-3">Equipment Management</h3>
              <p className="text-gray-600">
                Track your kites, boards, and gear inventory with detailed usage history and maintenance schedules.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition">
              <div className="w-14 h-14 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4 text-2xl">
                💳
              </div>
              <h3 className="text-xl font-semibold mb-3">Seamless Payments</h3>
              <p className="text-gray-600">
                Accept payments online, track deposits, and manage refunds with our integrated payment system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Transform Your Kite School Operations
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mt-1 bg-green-100 rounded-full p-1 mr-4">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Save 15+ hours per week</h3>
                    <p className="text-gray-600">Automate scheduling, bookings, and administrative tasks.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 bg-green-100 rounded-full p-1 mr-4">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Increase bookings by 30%</h3>
                    <p className="text-gray-600">Optimize scheduling and reduce cancellations with smart weather forecasting.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 bg-green-100 rounded-full p-1 mr-4">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Improve student retention</h3>
                    <p className="text-gray-600">Personalized progress tracking and tailored lesson experiences.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 bg-green-100 rounded-full p-1 mr-4">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Reduce equipment costs</h3>
                    <p className="text-gray-600">Track gear usage and maintenance to extend equipment lifespan.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className="relative">
                <div className="bg-blue-600 rounded-lg p-6 text-white">
                  <h3 className="text-2xl font-bold mb-4">97%</h3>
                  <p className="text-lg">of kite schools report improved operations within 3 months of using KiteTraffic.</p>
                </div>
                
                <div className="absolute top-20 -right-4 bg-green-600 rounded-lg p-6 text-white">
                  <h3 className="text-2xl font-bold mb-4">30%</h3>
                  <p className="text-lg">average increase in booking volume after implementing our platform.</p>
                </div>
                
                <div className="absolute -bottom-6 left-10 bg-yellow-500 rounded-lg p-6 text-white">
                  <h3 className="text-2xl font-bold mb-4">15+</h3>
                  <p className="text-lg">hours saved per week on administrative tasks.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Loved by Kite School Owners</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what kite school operators have to say about KiteTraffic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-xl">
                  MK
                </div>
                <div className="ml-4">
                  <h4 className="font-bold">Marco Klein</h4>
                  <p className="text-gray-600 text-sm">WindRiders Kite School</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "KiteTraffic has completely transformed our booking process. We've increased our lesson capacity by 40% without adding any staff, and our students love the timely weather notifications."
              </p>
              <div className="mt-4 flex text-yellow-400">
                ★★★★★
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-xl">
                  SL
                </div>
                <div className="ml-4">
                  <h4 className="font-bold">Sarah Lewis</h4>
                  <p className="text-gray-600 text-sm">OceanEdge Kiteboarding</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "The equipment tracking feature alone has saved us thousands in gear replacement costs. Plus, the ability to match students with the right instructor based on skill level is game-changing."
              </p>
              <div className="mt-4 flex text-yellow-400">
                ★★★★★
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center text-xl">
                  JP
                </div>
                <div className="ml-4">
                  <h4 className="font-bold">Juan Perez</h4>
                  <p className="text-gray-600 text-sm">KiteZone Academy</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "As someone who hates paperwork, KiteTraffic has been a lifesaver. I spend more time on the water teaching and less time handling bookings and scheduling. My students get better experiences too!"
              </p>
              <div className="mt-4 flex text-yellow-400">
                ★★★★★
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Kite School?</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Join hundreds of kite schools already using KiteTraffic to streamline operations, increase bookings, and deliver exceptional student experiences.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              href="/register" 
              className="px-8 py-3 bg-white text-blue-600 rounded-full text-lg font-medium hover:bg-blue-50 transition shadow-lg"
            >
              Start Your Free Trial
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-3 border border-white text-white rounded-full text-lg font-medium hover:bg-blue-500 transition"
            >
              Schedule a Demo
            </Link>
          </div>
          <p className="mt-6 text-blue-200">No credit card required. 14-day free trial.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="text-2xl font-bold text-white mb-4">KiteTraffic</div>
              <p className="max-w-xs">The complete management solution for kite schools and water sports academies.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-white font-medium mb-4">Product</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white transition">Features</a></li>
                  <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                  <li><a href="#" className="hover:text-white transition">Testimonials</a></li>
                  <li><a href="#" className="hover:text-white transition">FAQ</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-medium mb-4">Company</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white transition">About</a></li>
                  <li><a href="#" className="hover:text-white transition">Blog</a></li>
                  <li><a href="#" className="hover:text-white transition">Careers</a></li>
                  <li><a href="#" className="hover:text-white transition">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-medium mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                  <li><a href="#" className="hover:text-white transition">Terms</a></li>
                  <li><a href="#" className="hover:text-white transition">Security</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} KiteTraffic. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition">
                <span className="sr-only">Facebook</span>
                Facebook
              </a>
              <a href="#" className="hover:text-white transition">
                <span className="sr-only">Twitter</span>
                Twitter
              </a>
              <a href="#" className="hover:text-white transition">
                <span className="sr-only">Instagram</span>
                Instagram
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* For Admin: Link to API Dashboard */}
      <div className="fixed bottom-6 right-6">
        <Link 
          href="/admin" 
          className="bg-gray-800 text-white text-xs px-3 py-2 rounded-full opacity-70 hover:opacity-100 transition"
        >
          Admin Access
        </Link>
      </div>
    </div>
  );
}