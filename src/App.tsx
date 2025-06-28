import { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Insights from './pages/Insights';
import Careers from './pages/Careers';
import SignIn from './components/auth/SignIn';
import NewUser from './components/auth/NewUser';
import Profile from './components/auth/Profile';
import EmployersLogin from './pages/EmployersLogin';
import EmployersDashboard from './pages/EmployersDashboard';
import ForgotPassword from './components/auth/ForgotPassword';
import EmployerForgotPassword from './components/auth/EmployerForgotPassword';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import type {} from 'react-router-dom';
import { MessageSquareDot, Send, CheckCircle2 } from 'lucide-react';
import { ToastProvider } from './components/ToastContext'; // Import ToastProvider

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { from: 'bot', text: '👋 Hello! How can I help you today?' }
  ]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSend = () => {
    if (chatInput.trim() === '') return;
    setChatMessages([...chatMessages, { from: 'user', text: chatInput }]);
    // Toast will be managed by useToast in child components
    setTimeout(() => {
      setChatMessages((msgs) => [
        ...msgs,
        { from: 'bot', text: 'Thank you for your message! Our team will get back to you soon.' },
      ]);
    }, 800);
    setChatInput('');
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <ToastProvider> {/* Wrap the app with ToastProvider */}
        <Router>
          <Header isScrolled={isScrolled} />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/signin" element={<SignIn />} /> {/* Update SignIn to use useToast if needed */}
              <Route path="/signup" element={<NewUser />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/employers-login" element={<EmployersLogin />} />
              <Route path="/employers-dashboard" element={<EmployersDashboard />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/employer-forgot-password" element={<EmployerForgotPassword />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </ToastProvider>
    </div>
  );
}

export default App;