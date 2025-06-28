import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EmployerForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
    setParticles(
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 5,
      }))
    );
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!email) {
      setError('Please enter your email address.');
      setIsLoading(false);
      return;
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2500));
    setIsLoading(false);
    setIsSuccess(true);
  };

  const handleBackToLogin = () => {
    navigate('/employers-login');
  };

  const resetForm = () => {
    setIsSuccess(false);
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-purple-900 flex items-center justify-center p-4 pt-24 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animation: `float 10s ease-in-out infinite ${particle.delay}s`,
            }}
          />
        ))}
        <div className="absolute top-1/4 left-1/4 w-56 h-56 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full opacity-15 blur-3xl animate-pulse"
          style={{ animationDelay: '3s' }}
        />
        <div className="absolute top-16 right-16 w-20 h-20 border-2 border-white border-opacity-10 rotate-45 animate-spin" style={{ animationDuration: '20s' }} />
        <div
          className="absolute bottom-16 left-16 w-14 h-14 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full opacity-20 animate-bounce"
          style={{ animationDelay: '1.5s' }}
        />
        <div className="absolute top-1/2 left-8 w-8 h-8 border border-white border-opacity-20 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
      </div>

      {/* Main Container */}
      <div
        className={`w-full max-w-lg transform transition-all duration-1000 ease-out relative z-20 ${
          isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-90'
        }`}
      >
        <div className="backdrop-blur-2xl bg-white bg-opacity-10 rounded-2xl shadow-2xl border border-white border-opacity-20 p-6 relative overflow-hidden">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 opacity-30 blur-sm animate-pulse" />
          <div className="absolute inset-0.5 rounded-2xl bg-gradient-to-br from-blue-900 via-blue-700 to-purple-900 opacity-95" />
          
          <div className="relative z-10">
            {!isSuccess ? (
              // Forgot Password Form
              <div>
                {/* Header */}
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center shadow-lg animate-bounce mb-4">
                    <div className="w-8 h-8 bg-white rounded-full opacity-30 animate-pulse" />
                  </div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent mb-2 animate-fade-in">
                    Employer Password Reset
                  </h1>
                  <p className="text-gray-300 text-sm animate-fade-in-delayed">
                    Enter your employer email and we'll send you reset instructions
                  </p>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mb-4 p-3 bg-red-500 bg-opacity-30 border border-red-400 border-opacity-50 rounded-xl text-red-200 text-sm animate-shake">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                      <span>{error}</span>
                    </div>
                  </div>
                )}

                {/* Form */}
                <div className="space-y-4">
                  <div className="relative">
                    <label className="block text-sm text-gray-300 mb-2">Employer Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:border-blue-400 focus:bg-opacity-15 transition-all duration-300 ${
                        focusedField === 'email' ? 'transform scale-105 shadow-lg shadow-blue-500/20' : ''
                      }`}
                      placeholder="Enter your employer email address"
                      required
                    />
                    <div
                      className={`absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 -z-10 blur transition-all duration-300 ${
                        focusedField === 'email' ? 'opacity-20' : ''
                      }`}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:shadow-blue-500/30 transform hover:scale-105 transition-all duration-300 disabled:opacity-70 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className={`relative ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                      Send Reset Instructions
                    </span>
                    {isLoading && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                  </button>
                </div>

                {/* Back to Login */}
                <div className="mt-6 text-center">
                  <button
                    onClick={handleBackToLogin}
                    className="inline-flex items-center space-x-2 text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-105 group"
                  >
                    <div className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300">
                      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </div>
                    <span className="text-sm">Back to Employer Login</span>
                  </button>
                </div>
              </div>
            ) : (
              // Success State
              <div className="text-center animate-fade-in">
                <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center shadow-lg animate-bounce mb-6">
                  <div className="w-10 h-10 text-white animate-pulse">
                    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent mb-4">
                  Check Your Email!
                </h2>
                
                <p className="text-gray-300 mb-6 leading-relaxed">
                  We've sent password reset instructions to<br />
                  <span className="text-blue-300 font-medium">{email}</span>
                </p>
                
                <div className="space-y-4">
                  <button
                    onClick={resetForm}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:shadow-blue-500/30 transform hover:scale-105 transition-all duration-300"
                  >
                    Send to Different Email
                  </button>
                  
                  <button
                    onClick={handleBackToLogin}
                    className="w-full py-3 border border-white border-opacity-30 text-white font-medium rounded-xl hover:bg-white hover:bg-opacity-10 transition-all duration-300 transform hover:scale-105"
                  >
                    Back to Employer Login
                  </button>
                </div>
                
                <div className="mt-6 p-4 bg-blue-500 bg-opacity-20 border border-blue-400 border-opacity-30 rounded-xl">
                  <p className="text-blue-200 text-sm">
                    <span className="font-medium">Tip:</span> Check your spam folder if you don't see the email within a few minutes
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          25% { transform: translateY(-25px) translateX(15px); opacity: 0.7; }
          50% { transform: translateY(-50px) translateX(-10px); opacity: 0.9; }
          75% { transform: translateY(-25px) translateX(-15px); opacity: 0.7; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-delayed {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 0.9; transform: translateY(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        .animate-fade-in-delayed {
          animation: fade-in-delayed 1.2s ease-out 0.4s forwards;
          opacity: 0;
        }
        .animate-shake {
          animation: shake 0.6s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default EmployerForgotPassword; 