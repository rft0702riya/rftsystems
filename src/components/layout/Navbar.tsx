import { Link, useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
  const [mainDropdownOpen, setMainDropdownOpen] = useState(false);
  const [subDropdown, setSubDropdown] = useState<string | null>(null);

  const handleNavClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      window.location.href = '/#' + sectionId;
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      window.location.href = '/';
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSignInClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = '/signin';
  };

  const handleNewUserClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = '/signup';
  };

  const linkClass =
    'text-gray-800 font-medium text-sm uppercase tracking-wide relative rounded-full px-4 py-2 transition-all duration-200 ease-in-out hover:text-indigo-700 hover:bg-gray-100 hover:shadow-md hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-300 after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[2px] after:bg-indigo-600 after:transition-all after:duration-300 hover:after:w-1/2';

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 w-full">
          {/* Left: Logo and Nav */}
          <div className="flex items-center flex-shrink-0">
            <img src="/public/RFT logo.png" alt="Logo" className="h-16 w-16 rounded-full border-4 border-blue-400 mr-8" />
            <div className="hidden lg:flex items-center space-x-4">
              <a href="/" onClick={handleHomeClick} className={linkClass}>Home</a>
              <a href="/#services" onClick={(e) => handleNavClick(e, 'services')} className={linkClass}>Services</a>
              <a href="/#about" onClick={(e) => handleNavClick(e, 'about')} className={linkClass}>About</a>
              <a href="/#what-we-do" onClick={(e) => handleNavClick(e, 'what-we-do')} className={linkClass}>What We Do</a>
              {/* Learn More Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setMainDropdownOpen(!mainDropdownOpen);
                    setSubDropdown(null);
                  }}
                  className={linkClass}
                >
                  Learn More
                </button>
                <AnimatePresence>
                  {mainDropdownOpen && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={dropdownVariants}
                      className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg w-56 z-50"
                    >
                      <ul className="py-2">
                        <li>
                          <button onClick={() => setSubDropdown('careers')} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Careers</button>
                        </li>
                        <li>
                          <button onClick={() => setSubDropdown('learn')} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Learn</button>
                        </li>
                        <li>
                          <Link to="/enquiry" className="block px-4 py-2 hover:bg-gray-100">Enquiry</Link>
                        </li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
                {/* Sub-dropdowns */}
                <AnimatePresence>
                  {subDropdown === 'careers' && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={dropdownVariants}
                      className="absolute top-full left-56 mt-2 bg-white border border-gray-200 rounded-md shadow-lg w-64 z-50"
                    >
                      <ul className="py-2">
                        <li><Link to="/life-at-rft" className="block px-4 py-2 hover:bg-gray-100">Life at RFT</Link></li>
                        <li><Link to="/employee-says" className="block px-4 py-2 hover:bg-gray-100">What Our Employees Say</Link></li>
                        <li><Link to="/open-positions" className="block px-4 py-2 hover:bg-gray-100">Open Positions</Link></li>
                        <li><Link to="/apply" className="block px-4 py-2 hover:bg-gray-100">Apply</Link></li>
                      </ul>
                    </motion.div>
                  )}
                  {subDropdown === 'learn' && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={dropdownVariants}
                      className="absolute top-full left-56 mt-2 bg-white border border-gray-200 rounded-md shadow-lg w-48 z-50"
                    >
                      <ul className="py-2">
                        <li><Link to="/mdu" className="block px-4 py-2 hover:bg-gray-100">MDU</Link></li>
                        <li><Link to="/crd" className="block px-4 py-2 hover:bg-gray-100">CRD</Link></li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <a href="/#contact" onClick={(e) => handleNavClick(e, 'contact')} className={linkClass}>Contact Us</a>
            </div>
          </div>
          {/* Spacer for gap */}
          <div className="flex-1" />
          {/* Right: Login/Register/For Employer's */}
          <div className="hidden lg:flex items-center space-x-4">
            <button onClick={handleSignInClick} className="px-4 py-2 border border-gray-400 bg-gradient-to-b from-gray-300 to-gray-500 text-gray-900 rounded-full hover:from-gray-400 hover:to-gray-600 font-semibold text-sm shadow-lg transition-colors duration-200">Login</button>
            <button onClick={handleNewUserClick} className="px-4 py-2 bg-gradient-to-b from-red-500 to-red-700 text-white rounded-full hover:from-red-600 hover:to-red-800 font-semibold text-sm shadow-md transition-colors duration-200">Register</button>
            <span className="h-6 w-px bg-gray-400 mx-2 rounded-full" />
            <button className="px-4 py-2 border border-gray-400 bg-gradient-to-b from-gray-300 to-gray-500 text-gray-900 rounded-full hover:from-gray-400 hover:to-gray-600 font-semibold text-sm shadow-lg transition-colors duration-200 flex items-center gap-2">For Employer's</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;