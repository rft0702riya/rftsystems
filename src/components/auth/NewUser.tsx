import React, { useState } from 'react'; // <== You missed useState here

import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useToast } from '../ToastContext';
import { Eye, EyeOff, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  password: string;
  phone: string;
  workStatus: string;
  resume: File | null;
}

const NewUser: React.FC = () => {
  const { setToast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      phone: '',
      workStatus: '',
      resume: null,
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const storedData = { ...data, resume: data.resume?.name };
      localStorage.setItem('userProfile', JSON.stringify(storedData));

      setToast({
        message: 'Registration successful!',
        icon: <CheckCircle2 className="text-green-500" />,
      });

      navigate('/profile');
    } catch {
      setToast({
        message: 'Registration failed. Please try again.',
        icon: <span className="text-red-500">!</span>,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Mock Google Sign-in
  const handleGoogleSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      setToast({
        message: 'Google Sign-in simulated successfully!',
        icon: <CheckCircle2 className="text-green-500" />,
      });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        {/* Left Branding/Benefits */}
        <div className="w-full md:w-1/2 p-10 bg-gradient-to-br from-indigo-100 to-blue-50 flex flex-col items-center justify-center relative">
          <img src="/public/RFT logo.png" alt="RFT Logo" className="w-20 h-20 mb-6 rounded-full shadow-lg bg-white p-2" />
          <h3 className="text-2xl font-bold text-indigo-700 mb-2">Welcome to RFT Careers</h3>
          <p className="text-gray-600 mb-6 text-center">Join us and take the next step in your career journey!</p>
          <ul className="space-y-4 text-base text-gray-700 w-full max-w-xs">
            <li className="flex items-center gap-3">
              <CheckCircle2 className="text-green-500 w-6 h-6" />
              Build your profile and let recruiters find you
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="text-green-500 w-6 h-6" />
              Get job postings delivered to your email
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="text-green-500 w-6 h-6" />
              Find a job and grow your career
            </li>
          </ul>
          <div className="absolute bottom-6 left-0 right-0 flex justify-center">
            <span className="text-xs text-gray-400">&copy; {new Date().getFullYear()} RFT</span>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-extrabold text-indigo-800 mb-1">Create your Profile</h2>
          <p className="text-base text-gray-500 mb-8">Search & apply to jobs from India's No.1 Job Site</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Full Name */}
            <div className="relative">
              <input
                id="name"
                {...register('name', { required: 'Full name is required' })}
                placeholder=" "
                className={`peer w-full p-4 border ${errors.name ? 'border-red-400' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent bg-gray-50 transition-all`}
                aria-required="true"
              />
              <label htmlFor="name" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs transition-all bg-gray-50 px-1 pointer-events-none">Full name *</label>
              {errors.name && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1" role="alert">
                  <AlertCircle className="w-4 h-4" /> {errors.name.message}
                </p>
              )}
            </div>

            {/* Email ID */}
            <div className="relative">
              <input
                id="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Invalid email address',
                  },
                })}
                placeholder=" "
                className={`peer w-full p-4 border ${errors.email ? 'border-red-400' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent bg-gray-50 transition-all`}
                aria-required="true"
              />
              <label htmlFor="email" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs transition-all bg-gray-50 px-1 pointer-events-none">Email ID *</label>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1" role="alert">
                  <AlertCircle className="w-4 h-4" /> {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Password must be at least 6 characters' },
                })}
                placeholder=" "
                className={`peer w-full p-4 border ${errors.password ? 'border-red-400' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent bg-gray-50 transition-all pr-12`}
                aria-required="true"
              />
              <label htmlFor="password" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs transition-all bg-gray-50 px-1 pointer-events-none">Password *</label>
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 focus:outline-none"
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
              <p className="mt-1 text-xs text-gray-500">This helps your account stay protected</p>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1" role="alert">
                  <AlertCircle className="w-4 h-4" /> {errors.password.message}
                </p>
              )}
            </div>

            {/* Mobile Number */}
            <div className="relative">
              <input
                id="phone"
                {...register('phone', {
                  required: 'Mobile number is required',
                  pattern: {
                    value: /^\+?\d{10,}$/,
                    message: 'Invalid phone number',
                  },
                })}
                placeholder=" "
                className={`peer w-full p-4 border ${errors.phone ? 'border-red-400' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent bg-gray-50 transition-all`}
                aria-required="true"
              />
              <label htmlFor="phone" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs transition-all bg-gray-50 px-1 pointer-events-none">Mobile number *</label>
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1" role="alert">
                  <AlertCircle className="w-4 h-4" /> {errors.phone.message}
                </p>
              )}
            </div>

            {/* Work Status */}
            <div className="relative">
              <select
                id="workStatus"
                {...register('workStatus', { required: 'Work status is required' })}
                className={`peer w-full p-4 border ${errors.workStatus ? 'border-red-400' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent bg-gray-50 transition-all appearance-none`}
                aria-required="true"
                defaultValue=""
              >
                <option value="" disabled>Select work status *</option>
                <option value="Experienced">I'm experienced</option>
                <option value="Fresher">I'm a fresher</option>
              </select>
              <label htmlFor="workStatus" className="absolute left-4 top-2 text-gray-500 text-xs bg-gray-50 px-1 pointer-events-none">Work Status *</label>
              {errors.workStatus && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1" role="alert">
                  <AlertCircle className="w-4 h-4" /> {errors.workStatus.message}
                </p>
              )}
            </div>

            {/* Resume Upload */}
            <div className="relative">
              <input
                id="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                {...register('resume', { required: 'Resume is required' })}
                className={`peer w-full p-4 border ${errors.resume ? 'border-red-400' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent bg-gray-50 transition-all`}
                aria-required="true"
              />
              <label htmlFor="resume" className="absolute left-4 top-2 text-gray-500 text-xs bg-gray-50 px-1 pointer-events-none">Upload Resume *</label>
              {errors.resume && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1" role="alert">
                  <AlertCircle className="w-4 h-4" /> {errors.resume.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 transition-colors duration-200 disabled:opacity-50 font-semibold text-lg shadow-md"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5 inline-block mr-2" />
                  Registering...
                </>
              ) : (
                'Continue'
              )}
            </button>

            <p className="text-center text-sm text-gray-600">
              Already registered?{' '}
              <Link to="/signin" className="text-indigo-600 hover:underline font-medium">
                Sign In
              </Link>
            </p>
          </form>

          {/* Divider above Google button */}
          <div className="flex items-center my-8">
            <div className="border-t border-gray-300 flex-grow" />
            <span className="mx-4 text-sm text-gray-400">Or</span>
            <div className="border-t border-gray-300 flex-grow" />
          </div>

          {/* Google Sign-in (Styled) */}
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 bg-white text-gray-700 py-3 rounded-full hover:bg-gray-100 focus:ring-2 focus:ring-indigo-500 transition-colors duration-200 disabled:opacity-50 font-semibold text-base shadow-sm"
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google logo"
              className="w-5 h-5"
            />
            <span>Continue with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewUser;