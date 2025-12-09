import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowLeft, Coffee, User, UserCheck, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function SignupPage() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);
  
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (password !== confirmPassword) {
      setMessage({ type: 'error', text: 'Le password non coincidono' });
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setMessage({ type: 'error', text: 'La password deve essere di almeno 6 caratteri' });
      setLoading(false);
      return;
    }

    if (!firstName.trim() || !lastName.trim()) {
      setMessage({ type: 'error', text: 'Nome e cognome sono obbligatori' });
      setLoading(false);
      return;
    }
    const { error } = await signUp(email, password, firstName, lastName);

    if (error) {
      if (error.message.includes('User already registered') || error.message.includes('already been registered')) {
        setMessage({ 
          type: 'error', 
          text: 'Questa email è già registrata. Prova ad accedere o usa un\'altra email.' 
        });
      } else if (error.message.includes('Invalid email')) {
        setMessage({ 
          type: 'error', 
          text: 'Formato email non valido. Inserisci un indirizzo email corretto.' 
        });
      } else if (error.message.includes('Password should be at least')) {
        setMessage({ 
          type: 'error', 
          text: 'La password deve essere di almeno 6 caratteri.' 
        });
      } else if (error.message.includes('Signup requires a valid password')) {
        setMessage({ 
          type: 'error', 
          text: 'La password non è valida. Deve contenere almeno 6 caratteri.' 
        });
      } else {
        console.error('Signup error:', error);
        setMessage({ type: 'error', text: `Errore durante la registrazione: ${error.message}` });
      }
    } else {
      setMessage({ 
        type: 'success', 
        text: 'Account creato con successo! Controlla la tua email per confermare l\'account.' 
      });
      setTimeout(() => navigate('/login'), 2000);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-32 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <Link 
              to="/"
              className="inline-flex items-center text-blue-900 hover:text-yellow-600 transition-colors mb-8"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Torna alla Home
            </Link>
            
            <div className="flex items-center justify-center mb-6">
              <Coffee className="w-12 h-12 text-yellow-600" />
            </div>
            <h1 className="text-3xl font-bold text-blue-900 mb-2 font-serif">
              Crea il tuo Account
            </h1>
            <p className="text-gray-600">
              Registrati per gestire le tue prenotazioni
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-xl p-8">
            {message && (
              <div className={`p-4 rounded-lg mb-6 ${
                message.type === 'error' 
                  ? 'bg-red-50 border border-red-200 text-red-700' 
                  : 'bg-green-50 border border-green-200 text-green-700'
              }`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Nome
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                    placeholder="Il tuo nome"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    <UserCheck className="w-4 h-4 inline mr-2" />
                    Cognome
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                    placeholder="Il tuo cognome"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                  placeholder="La tua email"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  <Lock className="w-4 h-4 inline mr-2" />
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full p-3 pr-12 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                    placeholder="Almeno 6 caratteri"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  <Lock className="w-4 h-4 inline mr-2" />
                  Conferma Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full p-3 pr-12 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                    placeholder="Ripeti la password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                {loading ? 'Registrazione in corso...' : 'Registrati'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Hai già un account?{' '}
                <Link to="/login" className="text-yellow-600 hover:text-yellow-700 font-semibold">
                  Accedi
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}