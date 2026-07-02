import React, { useState, useContext } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Input } from '../../components/common/Input';
import { validateEmail } from '../../utils/validators';
import { toast } from 'react-toastify';

export const Login = () => {
  const { login, loading } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  
  const navigate = useNavigate();
  const location = useLocation();
  const fromRoute = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentErrors = {};
    if (!validateEmail(email)) currentErrors.email = 'Please provide a valid structural operational email format.';
    if (password.length < 4) currentErrors.password = 'Security password tier must match baseline metrics (min 4 characters).';

    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      return;
    }

    setErrors({});
    try {
      await login(email, password);
      toast.success('Authentication handshake accepted. Welcome Back!');
      navigate(fromRoute, { replace: true });
    } catch (err) {
      toast.error('Authentication process aborted on execution layers.');
    }
  };

  return (
    <div className="max-w-md mx-auto my-16 px-6 py-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 rounded-3xl shadow-xl">
      <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Account Authorization</h2>
      <p className="text-xs text-slate-400 mb-6">Gain programmatic runtime tokens to manage your platform metrics.</p>

      <form onSubmit={handleSubmit}>
        <Input 
          label="Corporate Identity Email" 
          placeholder="yourname@domain.com" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />
        <Input 
          label="Platform Encryption Passphrase" 
          type="password"
          placeholder="••••••••" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />

        <button 
          type="submit" 
          disabled={loading}
          className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-400 text-white font-semibold text-xs py-3.5 rounded-xl transition-all shadow-md"
        >
          {loading ? 'Validating Digital Credentials...' : 'Request Handshake Security Token'}
        </button>
      </form>

      <p className="text-center text-xs text-slate-500 mt-6">
        New platform node operator? <Link to="/signup" className="text-indigo-600 dark:text-indigo-400 hover:underline font-bold">Instantiate New Account</Link>
      </p>
    </div>
  );
};