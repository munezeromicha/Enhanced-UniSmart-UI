import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/validation';
import Button from '../../component/common/Button';
import { Mail, AlertCircle, ArrowLeft } from 'lucide-react';

interface FormData {
  email: string;
}

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    try {
      // Here you would integrate with your actual password reset API
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulated API call
      setSuccess(true);
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
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
          Reset Password
        </h2>
        <p className="mt-3 text-center text-xl font-medium text-cyan-800">
          UniSmart Attendance System
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[100%]">
        <div className="bg-white py-10 px-8 shadow-xl rounded-3xl border border-cyan-100">
          {!success ? (
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

              <div>
                <p className="text-gray-600 mb-6">
                  Enter your email address and we'll send you instructions to reset your password.
                </p>
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

              <div className="flex flex-col space-y-4">
                <Button
                  type="submit"
                  className="w-full flex justify-center py-4 px-4 bg-[#00628b] hover:bg-cyan-700 text-white text-lg font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00628b] transition-all duration-200 shadow-lg hover:shadow-xl"
                  isLoading={loading}
                >
                  Send Reset Instructions
                </Button>
                
                <Button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="w-full flex justify-center py-4 px-4 bg-[#00628b] border-2 border-[#00628b] hover:text-cyan-800 text-cyan-800 text-lg font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00628b] transition-all duration-200 hover:bg-cyan-50"
                  leftIcon={<ArrowLeft size={24} />}
                >
                  Back to Login
                </Button>
              </div>
            </form>
          ) : (
            <div className="text-center">
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-semibold text-green-800 mb-2">
                  Check your email
                </h3>
                <p className="text-green-700">
                  We've sent password reset instructions to {formData.email}
                </p>
              </div>
              <Button
                type="button"
                onClick={() => navigate('/login')}
                className="w-full flex justify-center py-4 px-4 bg-[#00628b] hover:bg-cyan-700 text-white text-lg font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00628b] transition-all duration-200 shadow-lg hover:shadow-xl"
                leftIcon={<ArrowLeft size={24} />}
              >
                Return to Login
              </Button>
            </div>
          )}

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

export default ResetPasswordPage; 