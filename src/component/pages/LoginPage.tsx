import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { validateEmail } from '../../utils/validation';
import Button from '../../component/common/Button';
import { User, Mail, Lock, AlertCircle } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      await login(formData.email, formData.password);
      navigate('/dashboard/lecturer');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-cyan-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-[150%]">
        <div className="flex justify-center">
          <img
            src="/images/logo.png"
            alt="UR Logo"
            className="h-28 w-28 transform hover:scale-105 transition-transform duration-200"
          />
        </div>
        <h2 className="mt-6 text-center text-4xl font-bold text-[#00628b] tracking-tight">
          University of Rwanda
        </h2>
        <p className="mt-3 text-center text-xl font-medium text-cyan-800">
          UniSmart Attendance System
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[100%]">
        <div className="bg-white py-10 px-8 shadow-xl rounded-3xl border border-cyan-100">
          <form className="space-y-8" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                <div className="flex items-center">
                  <AlertCircle className="h-6 w-6 text-red-400" />
                  <div className="ml-3">
                    <p className="text-base font-medium text-red-800">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-lg font-medium text-[#00628b]"
                >
                  Email address
                </label>
                <div className="mt-2 relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-6 w-6 text-cyan-500" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-12 block w-full text-lg shadow-sm border-2 focus:ring-2 focus:ring-[#00628b] focus:border-[#00628b] rounded-xl border-cyan-200 bg-cyan-50/30 py-3 transition-all duration-200"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-lg font-medium text-[#00628b]"
                >
                  Password
                </label>
                <div className="mt-2 relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-6 w-6 text-cyan-500" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-12 block w-full text-lg shadow-sm border-2 focus:ring-2 focus:ring-[#00628b] focus:border-[#00628b] rounded-xl border-cyan-200 bg-cyan-50/30 py-3 transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-5 w-5 text-[#00628b] focus:ring-[#00628b] border-2 border-cyan-300 rounded transition-all duration-200"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-3 block text-base font-medium text-[#00628b]"
                >
                  Remember me
                </label>
              </div>

              <div className="text-base">
                <a
                  href="/reset-password"
                  className="font-semibold text-[#00628b] hover:text-cyan-600 transition-colors duration-200"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full flex justify-center py-4 px-4 bg-[#00628b] hover:bg-cyan-700 text-white text-lg font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00628b] transition-all duration-200 shadow-lg hover:shadow-xl"
                isLoading={loading}
                leftIcon={<User size={24} />}
              >
                Sign in
              </Button>
            </div>
          </form>

          <div className="mt-10">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-cyan-200" />
              </div>
              <div className="relative flex justify-center text-base">
                <span className="px-4 bg-white text-[#00628b] font-medium">
                  Need help? Contact support
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;