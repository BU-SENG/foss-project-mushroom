import { Button, Card } from "../components/ui";
import { Link } from "react-router-dom";
import { Bolt, CalendarCheck, Clock } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 md:py-32 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gray-900 leading-tight">
            Manage Hostel Maintenance <br className="hidden sm:inline" />
            <span className="text-indigo-600">With Effortless Ease</span>
          </h1>

          <p className="text-gray-600 mt-6 max-w-2xl mx-auto text-base sm:text-lg md:text-xl font-light">
            Submit maintenance requests, track progress, and stay updated—all
            within a single, <strong>intuitive dashboard</strong>.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register">
              <Button
                size="lg"
                className="w-full sm:w-auto px-8 bg-indigo-600 hover:bg-indigo-700"
              >
                Get Started Free
              </Button>
            </Link>
            <Link to="/login">
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto px-8 border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Login
              </Button>
            </Link>
          </div>

          <div className="mt-16 w-full max-w-5xl mx-auto overflow-hidden rounded-xl border-4 border-gray-200 shadow-2xl transition duration-300 hover:shadow-indigo-300/50">
            <img
              src="https://picsum.photos/1600/1000"
              alt="Dashboard Screenshot"
              className="w-full h-auto object-cover"
            />
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">
            Focus On What Matters, We Handle The Rest
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card
              title="Instant Submission"
              titleAlign="center"
              className="shadow-xl hover:shadow-2xl transition duration-300 border-t-4 border-indigo-600"
            >
              <div className="flex justify-center mb-4">
                <Bolt className="h-10 w-10 sm:h-12 sm:w-12 text-indigo-600" />
              </div>
              <p className="text-center text-gray-600 text-sm sm:text-base">
                Create a maintenance request in seconds.{" "}
                <strong>Clean, fast, and stress-free</strong> with minimal
                fields.
              </p>
            </Card>

            <Card
              title="Real-time Tracking"
              titleAlign="center"
              className="shadow-xl hover:shadow-2xl transition duration-300 border-t-4 border-indigo-600"
            >
              <div className="flex justify-center mb-4">
                <Clock className="h-10 w-10 sm:h-12 sm:w-12 text-indigo-600" />
              </div>
              <p className="text-center text-gray-600 text-sm sm:text-base">
                View live status updates (Pending, In Progress, Complete) to
                eliminate guesswork.
              </p>
            </Card>

            <Card
              title="Completion Assurance"
              titleAlign="center"
              className="shadow-xl hover:shadow-2xl transition duration-300 border-t-4 border-indigo-600"
            >
              <div className="flex justify-center mb-4">
                <CalendarCheck className="h-10 w-10 sm:h-12 sm:w-12 text-indigo-600" />
              </div>
              <p className="text-center text-gray-600 text-sm sm:text-base">
                Get notified when the issue is resolved, ensuring timely and
                complete service.
              </p>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
