import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, QrCode, Users, BarChart2, Shield } from 'lucide-react';
import Button from '../../component/common/Button';

const LandingPage = () => {
  const features = [
    {
      icon: QrCode,
      title: 'QR Code Attendance',
      description: 'Easy and secure attendance tracking using QR codes with location verification.',
    },
    {
      icon: Users,
      title: 'Multi-User System',
      description: 'Different roles for students, lecturers, HODs, and administrators.',
    },
    {
      icon: BarChart2,
      title: 'Real-time Analytics',
      description: 'Comprehensive dashboards with attendance statistics and reporting.',
    },
    {
      icon: Shield,
      title: 'Location Verification',
      description: 'GPS-based verification ensures students are physically present in class.',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Generate QR Code',
      description: 'Lecturers generate a unique QR code for each class session.',
    },
    {
      number: '02',
      title: 'Scan Code',
      description: 'Students scan the QR code using their mobile devices.',
    },
    {
      number: '03',
      title: 'Verify Location',
      description: 'System verifies student\'s location matches the classroom.',
    },
    {
      number: '04',
      title: 'Track Attendance',
      description: 'Attendance is recorded and available in real-time dashboard.',
    },
  ];

  return (
    <div className="bg-white">
      {/* Enhanced Header/Navigation */}
      <header className="bg-white border-b border-blue-100 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <img
                src="/images/logo.png"
                alt="UR Logo"
                className="h-12 w-12 transform hover:scale-105 transition-transform duration-200"
              />
              <span className="text-2xl font-bold text-[#00628b] tracking-tight">
                University of Rwanda
              </span>
            </div>
            <div>
              <Link to="/login">
                <Button variant="outline" className="hover:bg-[#00628b] hover:text-[#00628b] transition-colors duration-200 border-[#00628b] text-[#00628b]">
                  Sign in
                </Button>
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Enhanced Hero Section */}
      <div className="relative bg-gradient-to-br from-[#00628b] via-[#00628b] to-[#00628b] overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight">
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                UniSmart Attendance
              </span>
              <span className="block text-2xl md:text-3xl mt-6 font-medium text-blue-100">
                Modern Solution for Student Attendance Management
              </span>
            </h1>
            <p className="mt-8 max-w-3xl mx-auto text-xl text-blue-100 leading-relaxed">
              Streamline attendance tracking with QR codes, location verification,
              and real-time analytics.
            </p>
            <div className="mt-12">
              <Link to="/login">
                <Button size="lg" className="bg-[#00628b] text-white hover:bg-[#00628b] hover:text-white px-12 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Features Section */}
      <div className="py-32 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-[#00628b] tracking-tight">
              Key Features
            </h2>
            <p className="mt-6 text-xl text-[#00628b] max-w-2xl mx-auto">
              Everything you need to efficiently manage student attendance
            </p>
          </div>

          <div className="mt-24">
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
                >
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                    <div className="bg-[#00628b] p-4 rounded-2xl shadow-lg">
                      <feature.icon className="h-10 w-10 text-white" />
                    </div>
                  </div>
                  <div className="pt-8 text-center">
                    <h3 className="text-xl font-semibold text-[#00628b] mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-[#00628b] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced How It Works Section */}
      <div className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-[#00628b] tracking-tight">
              How It Works
            </h2>
            <p className="mt-6 text-xl text-[#00628b] max-w-2xl mx-auto">
              Simple and efficient process for tracking attendance
            </p>
          </div>

          <div className="mt-24">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => (
                <div key={index} className="text-center group">
                  <div className="relative">
                    <div className="w-16 h-16 bg-[#00628b] rounded-2xl flex items-center justify-center mx-auto text-white text-xl font-bold transform group-hover:scale-110 transition-transform duration-200">
                      {step.number}
                    </div>
                    {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-8 left-full w-full h-1 bg-[#00628b] transform -translate-x-8" />
                    )}
                  </div>
                  <h3 className="mt-8 text-xl font-semibold text-[#00628b]">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-[#00628b] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Footer */}
      <footer className="bg-blue-50 border-t border-blue-100">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-base text-[#00628b]">
              © {new Date().getFullYear()} University of Rwanda.
              All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;