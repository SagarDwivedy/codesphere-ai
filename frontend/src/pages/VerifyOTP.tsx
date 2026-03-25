import { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuthStore } from '../store/authStore';

export default function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth } = useAuthStore();
  const email = location.state?.email || '';

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    // Auto focus next
    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/auth/verify-otp', {
        email,
        otp: otpString,
      });
      setAuth(data.user, data.token);
      navigate('/chat');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await api.post('/auth/register', { email });
      setError('');
      alert('New OTP sent to your email!');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to resend OTP');
    }
  };

  return (
    <div className="min-h-screen bg-surface-secondary dark:bg-dark-primary flex items-center justify-center p-4">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="flex items-center gap-2 mb-8 justify-center">
          <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-semibold text-sm">C</span>
          </div>
          <span className="font-semibold text-gray-900 dark:text-white">CodeSphere AI</span>
        </div>

        <div className="card p-8">
          <div className="mb-6 text-center">
            <div className="w-12 h-12 bg-brand-50 dark:bg-brand-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">📧</span>
            </div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
              Check your email
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              We sent a 6-digit code to
            </p>
            <p className="text-sm font-medium text-brand-600 mt-0.5">{email}</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* OTP inputs */}
            <div className="flex gap-2 justify-center mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {inputs.current[index] = el;}}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-11 h-12 text-center text-lg font-semibold border border-gray-200 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-white dark:bg-dark-secondary text-gray-900 dark:text-white transition-all"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? 'Verifying...' : 'Verify email'}
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Didn't receive the code?{' '}
              <button
                onClick={handleResend}
                className="text-brand-600 font-medium hover:underline"
              >
                Resend
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}