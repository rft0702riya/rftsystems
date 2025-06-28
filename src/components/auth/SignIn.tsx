import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
    setParticles(
      Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 4,
      }))
    );
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields.');
      setIsLoading(false);
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log('Submitted:', formData);
    setIsLoading(false);
  };

  const handleGoogleSignIn = () => console.log('Google Sign In clicked');

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4 pt-24 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animation: `float 8s ease-in-out infinite ${particle.delay}s`,
            }}
          />
        ))}
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-15 blur-3xl animate-pulse"
          style={{ animationDelay: '2s' }}
        />
        <div className="absolute top-10 right-10 w-16 h-16 border-2 border-white border-opacity-10 rotate-45 animate-spin" style={{ animationDuration: '15s' }} />
        <div
          className="absolute bottom-10 left-10 w-12 h-12 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full opacity-20 animate-bounce"
          style={{ animationDelay: '1s' }}
        />
      </div>

      {/* Main Container */}
      <div
        className={`w-full max-w-lg transform transition-all duration-1000 ease-out relative z-20 ${
          isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-90'
        }`}
      >
        <div className="backdrop-blur-2xl bg-white bg-opacity-10 rounded-2xl shadow-2xl border border-white border-opacity-20 p-5 relative overflow-hidden">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 opacity-30 blur-sm animate-pulse" />
          <div className="absolute inset-0.5 rounded-2xl bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 opacity-95" />
          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-4">
              <div className="w-14 h-14 mx-auto bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <div className="w-7 h-7 bg-white rounded-full opacity-20" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent mb-1 animate-fade-in">
                Welcome Back
              </h1>
              <p className="text-gray-300 text-sm animate-fade-in-delayed">Sign in to continue your journey</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-3 p-2 bg-red-500 bg-opacity-30 border border-red-400 border-opacity-50 rounded-xl text-red-200 text-sm animate-shake">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                  <span>{error}</span>
                </div>
              </div>
            )}

            {/* Form */}
            <form className="space-y-3" onSubmit={handleSubmit}>
              <div className="relative">
                <label className="block text-sm text-gray-300 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 py-2.5 bg-white bg-opacity-10 border border-white border-opacity-30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:border-purple-400 focus:bg-opacity-15 transition-all duration-300 text-sm ${
                    focusedField === 'email' ? 'transform scale-105 shadow-lg shadow-purple-500/20' : ''
                  }`}
                  placeholder="Enter your email"
                  required
                />
                <div
                  className={`absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 -z-10 blur transition-all duration-300 ${
                    focusedField === 'email' ? 'opacity-20' : ''
                  }`}
                />
              </div>

              <div className="relative">
                <label className="block text-sm text-gray-300 mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 py-2.5 bg-white bg-opacity-10 border border-white border-opacity-30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:border-purple-400 focus:bg-opacity-15 transition-all duration-300 text-sm ${
                    focusedField === 'password' ? 'transform scale-105 shadow-lg shadow-purple-500/20' : ''
                  }`}
                  placeholder="Enter your password"
                  required
                />
                <div
                  className={`absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 -z-10 blur transition-all duration-300 ${
                    focusedField === 'password' ? 'opacity-20' : ''
                  }`}
                />
              </div>

              <div className="text-right">
                <button
                  type="button"
                  className="text-purple-300 hover:text-purple-200 text-sm transition-all duration-200 hover:underline hover:scale-105 transform"
                  onClick={() => navigate('/forgot-password')}
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:shadow-purple-500/30 transform hover:scale-105 transition-all duration-300 disabled:opacity-70 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className={`relative ${isLoading ? 'opacity-0' : 'opacity-100'}`}>Sign In</span>
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </button>

              <button
                type="button"
                className="w-full py-2.5 border border-white border-opacity-30 text-white font-medium rounded-xl hover:bg-white hover:bg-opacity-10 transition-all duration-300 transform hover:scale-105"
              >
                Use OTP to Login
              </button>
            </form>

            <div className="my-4 flex items-center">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-20" />
              <span className="px-4 text-gray-300 text-sm">or</span>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent via-white to-transparent opacity-20" />
            </div>

            <button
              onClick={handleGoogleSignIn}
              className="w-full py-2.5 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-xl text-white font-medium flex items-center justify-center space-x-3 hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105"
            >
              <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                <span className="text-xs font-bold text-blue-600">G</span>
              </div>
              <span>Continue with Google</span>
            </button>

            <p className="mt-4 text-center text-gray-300 text-sm">
              Don't have an account?{' '}
              <button className="text-purple-300 hover:text-purple-200 font-medium hover:underline hover:scale-105 transform transition-all duration-200">
                Register for free
              </button>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          25% { transform: translateY(-20px) translateX(10px); opacity: 0.6; }
          50% { transform: translateY(-40px) translateX(-5px); opacity: 0.8; }
          75% { transform: translateY(-20px) translateX(-10px); opacity: 0.6; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-delayed {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 0.9; transform: translateY(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        .animate-fade-in-delayed {
          animation: fade-in-delayed 1s ease-out 0.3s forwards;
          opacity: 0;
        }
        .animate-shake {
          animation: shake 0.6s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default SignIn;