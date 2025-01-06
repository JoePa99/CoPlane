import { Plane, Calendar, DollarSign, Wrench, AlertTriangle, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="relative overflow-hidden mb-16">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/N8257E.jpg"
            alt="Piper Cherokee N8257E at night"
            className="w-full h-[500px] object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent" />
        </div>

        <div className="relative z-10 py-24 px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            COPLANE
          </h1>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto">
            Aircraft co-ownership made simple.
          </p>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 mb-16">
        <FeatureCard
          to="/schedule"
          icon={Calendar}
          title="Schedule"
          description="View and book flights effortlessly."
        />
        <FeatureCard
          to="/logs"
          icon={BookOpen}
          title="Flight Logs"
          description="Track flight details and Hobbs time."
        />
        <FeatureCard
          to="/expenses"
          icon={DollarSign}
          title="Expenses"
          description="Track shared costs and balances."
        />
        <FeatureCard
          to="/maintenance"
          icon={Wrench}
          title="Maintenance"
          description="Log and track scheduled maintenance."
        />
        <FeatureCard
          to="/squawks"
          icon={AlertTriangle}
          title="Squawks"
          description="Report and review issues affecting the plane."
        />
      </div>
    </div>
  );
}

function FeatureCard({
  to,
  icon: Icon,
  title,
  description,
}: {
  to: string;
  icon: typeof Plane;
  title: string;
  description: string;
}) {
  return (
    <Link
      to={to}
      className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
    >
      <Icon className="h-8 w-8 text-primary-600 mb-4" />
      <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </Link>
  );
}