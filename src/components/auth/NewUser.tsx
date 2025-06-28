import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NewUser: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    otp: '',
    password: '',
    confirmPassword: '',
  });
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, delay: number}>>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
    // Generate floating particles
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 4
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer(otpTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
    if (success) setSuccess(null);
  };

  const sendOtp = async () => {
    if (!formData.email) {
      setError('Please enter your email address.');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    // Simulate OTP sending
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsOtpSent(true);
    setOtpTimer(60);
    setSuccess('OTP sent to your email address!');
    setIsLoading(false);
  };

  const verifyOtp = async () => {
    if (!formData.otp) {
      setError('Please enter the OTP.');
      return;
    }

    if (formData.otp.length !== 6) {
      setError('OTP must be 6 digits.');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    // Simulate OTP verification
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate successful verification (in real app, check with backend)
    if (formData.otp === '123456' || formData.otp.length === 6) {
      setIsEmailVerified(true);
      setSuccess('Email verified successfully! ✓');
      setCurrentStep(2);
    } else {
      setError('Invalid OTP. Please try again.');
    }
    
    setIsLoading(false);
  };

  const handleRegister = async () => {
    setError(null);
    
    // Validation
    if (!formData.fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }
    
    if (!formData.password) {
      setError('Please create a password.');
      return;
    }
    
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    
    // Simulate registration
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setShowSuccessPopup(true);
    
    // Auto close popup after 3 seconds
    setTimeout(() => {
      setShowSuccessPopup(false);
    }, 3000);
  };

  const resendOtp = async () => {
    await sendOtp();
  };

  return (
    <div className="h-screen relative overflow-hidden bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Floating Particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animation: `float 8s ease-in-out infinite ${particle.delay}s`
            }}
          />
        ))}
        
        {/* Animated Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full opacity-20 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-15 blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
        
        {/* Geometric Shapes */}
        <div className="absolute top-10 right-10 w-20 h-20 border-2 border-white border-opacity-10 rotate-45 animate-spin" style={{animationDuration: '15s'}} />
        <div className="absolute bottom-10 left-10 w-16 h-16 bg-gradient-to-r from-emerald-300 to-teal-300 rounded-full opacity-20 animate-bounce" style={{animationDelay: '1s'}} />
      </div>

      {/* Main Container */}
      <div className="flex items-center justify-center h-full p-4 relative z-10">
        <div 
          className={`w-full max-w-lg my-4 transform transition-all duration-1000 ease-out ${
            isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-90'
          }`}
        >
          {/* Glassmorphism Card */}
          <div className="backdrop-blur-2xl bg-white bg-opacity-5 rounded-3xl shadow-2xl border border-white border-opacity-10 p-6 relative overflow-hidden">
            {/* Animated Border */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 opacity-30 blur-sm animate-pulse" />
            <div className="absolute inset-0.5 rounded-3xl bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 opacity-90" />
            
            {/* Content */}
            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-6">
                <div className="mb-3">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                    <div className="w-8 h-8 bg-white rounded-full opacity-20" />
                  </div>
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent mb-1 animate-fade-in">
                  Create Account
                </h1>
                <p className="text-gray-300 opacity-80 animate-fade-in-delayed text-sm">
                  Join us and start your journey
                </p>
              </div>

              {/* Progress Indicator */}
              <div className="flex items-center justify-center mb-6">
                <div className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    currentStep >= 1 ? 'bg-emerald-500 text-white' : 'bg-white bg-opacity-20 text-gray-400'
                  }`}>
                    1
                  </div>
                  <div className={`w-12 h-1 transition-all duration-300 ${
                    currentStep >= 2 ? 'bg-emerald-500' : 'bg-white bg-opacity-20'
                  }`} />
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    currentStep >= 2 ? 'bg-emerald-500 text-white' : 'bg-white bg-opacity-20 text-gray-400'
                  }`}>
                    2
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 bg-red-500 bg-opacity-20 border border-red-400 border-opacity-30 rounded-2xl text-red-200 text-sm animate-shake backdrop-blur-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                    <span>{error}</span>
                  </div>
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div className="mb-4 p-3 bg-emerald-500 bg-opacity-20 border border-emerald-400 border-opacity-30 rounded-2xl text-emerald-200 text-sm animate-fade-in backdrop-blur-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <span>{success}</span>
                  </div>
                </div>
              )}

              {/* Step 1: Basic Info & Email Verification */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  {/* Full Name */}
                  <div className="relative group">
                    <label className="block text-xs font-medium text-gray-300 mb-1 opacity-80">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('fullName')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-4 py-3 bg-white bg-opacity-5 border border-white border-opacity-20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:bg-opacity-10 transition-all duration-300 backdrop-blur-sm ${
                        focusedField === 'fullName' ? 'transform scale-105 shadow-lg shadow-emerald-500/20' : ''
                      }`}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="relative group">
                    <label className="block text-xs font-medium text-gray-300 mb-1 opacity-80">
                      Email Address
                    </label>
                    <div className="flex space-x-2">
                      <div className="flex w-full gap-4">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                          className={`flex-1 px-4 py-3 bg-white bg-opacity-5 border border-white border-opacity-20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:bg-opacity-10 transition-all duration-300 backdrop-blur-sm ${
                            focusedField === 'email' ? 'transform scale-105 shadow-lg shadow-emerald-500/20' : ''
                          } ${isEmailVerified ? 'border-emerald-400' : ''}`}
                          placeholder="Enter your email"
                          required
                          disabled={isEmailVerified}
                        />
                        {!isOtpSent && (
                          <button
                            onClick={sendOtp}
                            disabled={isLoading || !formData.email}
                            className="px-4 py-3 bg-emerald-500 text-white font-medium rounded-2xl hover:bg-emerald-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                          >
                            {isLoading ? (
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                              'Send OTP'
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* OTP Field */}
                  {isOtpSent && !isEmailVerified && (
                    <div className="relative group animate-fade-in">
                      <label className="block text-xs font-medium text-gray-300 mb-1 opacity-80">
                        Enter OTP
                      </label>
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          name="otp"
                          value={formData.otp}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('otp')}
                          onBlur={() => setFocusedField(null)}
                          className={`flex-1 px-4 py-3 bg-white bg-opacity-5 border border-white border-opacity-20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:bg-opacity-10 transition-all duration-300 backdrop-blur-sm ${
                            focusedField === 'otp' ? 'transform scale-105 shadow-lg shadow-emerald-500/20' : ''
                          }`}
                          placeholder="Enter 6-digit OTP"
                          maxLength={6}
                          required
                        />
                        <button
                          onClick={verifyOtp}
                          disabled={isLoading || formData.otp.length !== 6}
                          className="px-4 py-3 bg-emerald-500 text-white font-medium rounded-2xl hover:bg-emerald-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isLoading ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          ) : (
                            'Verify'
                          )}
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs text-gray-400">
                          Check your email for the OTP
                        </p>
                        {otpTimer > 0 ? (
                          <p className="text-xs text-emerald-400">
                            Resend in {otpTimer}s
                          </p>
                        ) : (
                          <button
                            onClick={resendOtp}
                            className="text-xs text-emerald-400 hover:text-emerald-300 underline"
                          >
                            Resend OTP
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 2: Password Creation */}
              {currentStep === 2 && (
                <div className="space-y-4 animate-fade-in">
                  {/* Create Password */}
                  <div className="relative group">
                    <label className="block text-xs font-medium text-gray-300 mb-1 opacity-80">
                      Create New Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-4 py-3 bg-white bg-opacity-5 border border-white border-opacity-20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:bg-opacity-10 transition-all duration-300 backdrop-blur-sm ${
                        focusedField === 'password' ? 'transform scale-105 shadow-lg shadow-emerald-500/20' : ''
                      }`}
                      placeholder="Create a strong password"
                      required
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      Password must be at least 8 characters long
                    </p>
                  </div>

                  {/* Confirm Password */}
                  <div className="relative group">
                    <label className="block text-xs font-medium text-gray-300 mb-1 opacity-80">
                      Re-enter New Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('confirmPassword')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-4 py-3 bg-white bg-opacity-5 border border-white border-opacity-20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:bg-opacity-10 transition-all duration-300 backdrop-blur-sm ${
                        focusedField === 'confirmPassword' ? 'transform scale-105 shadow-lg shadow-emerald-500/20' : ''
                      } ${formData.confirmPassword && formData.password === formData.confirmPassword ? 'border-emerald-400' : ''}`}
                      placeholder="Re-enter your password"
                      required
                    />
                    {formData.confirmPassword && (
                      <p className={`text-xs mt-1 ${
                        formData.password === formData.confirmPassword ? 'text-emerald-400' : 'text-red-400'
                      }`}>
                        {formData.password === formData.confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
                      </p>
                    )}
                  </div>

                  {/* Register Button */}
                  <button
                    onClick={handleRegister}
                    disabled={isLoading || !formData.password || !formData.confirmPassword || formData.password !== formData.confirmPassword}
                    className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:shadow-emerald-500/30 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-500 focus:ring-opacity-50 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className={`relative transition-all duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                      Register
                    </span>
                    {isLoading && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                  </button>
                </div>
              )}

              {/* Login Link */}
              <div className="mt-6 text-center">
                <p className="text-gray-300 opacity-80 text-sm">
                  Already have an account?{' '}
                  <button
                    className="text-emerald-300 hover:text-emerald-200 font-medium transition-all duration-200 hover:underline hover:scale-105 transform inline-block"
                    onClick={() => navigate('/signin')}
                  >
                    Sign In
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white bg-opacity-10 backdrop-blur-2xl rounded-3xl p-8 border border-white border-opacity-20 shadow-2xl animate-fade-in transform scale-110">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full flex items-center justify-center mb-4 animate-bounce">
                <div className="text-white text-2xl">✓</div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Success!</h2>
              <p className="text-gray-300 mb-4">Your account has been created successfully.</p>
              <button
                onClick={() => setShowSuccessPopup(false)}
                className="px-6 py-2 bg-emerald-500 text-white font-medium rounded-xl hover:bg-emerald-600 transition-all duration-300 transform hover:scale-105"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) translateX(0px); 
            opacity: 0.3;
          }
          25% { 
            transform: translateY(-20px) translateX(10px); 
            opacity: 0.6;
          }
          50% { 
            transform: translateY(-40px) translateX(-5px); 
            opacity: 0.8;
          }
          75% { 
            transform: translateY(-20px) translateX(-10px); 
            opacity: 0.6;
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-delayed {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 0.8;
            transform: translateY(0);
          }
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

export default NewUser;