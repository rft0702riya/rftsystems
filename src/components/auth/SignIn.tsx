import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

const SignIn: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields.');
      return;
    }

    console.log('Submitted:', formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f1f2f4]">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">Login</h2>
          <Link
            to="/signup"
            className="text-blue-600 font-medium text-sm hover:underline"
          >
            Register for free
          </Link>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Enter your active Email ID / Username"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              required
            />
            <div className="text-right text-sm mt-1">
              <a href="#" className="text-blue-600 hover:underline">
                Forgot Password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 font-medium"
          >
            Login
          </button>

          <div className="text-center text-sm text-blue-600 hover:underline cursor-pointer">
            Use OTP to Login
          </div>

          <div className="flex items-center justify-center my-4">
            <div className="border-t border-gray-300 w-full"></div>
            <span className="px-2 text-gray-400 text-sm">or</span>
            <div className="border-t border-gray-300 w-full"></div>
          </div>

          <button
            type="button"
            className="flex items-center justify-center w-full border border-gray-300 py-2 rounded-md hover:bg-gray-50"
          >
            <FcGoogle className="mr-2 text-xl" />
            <span className="text-sm font-medium text-gray-700">
              Sign in with Google
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
