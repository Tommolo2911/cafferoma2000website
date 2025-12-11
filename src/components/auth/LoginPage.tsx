import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowLeft, Coffee, Eye, EyeOff, RotateCcw } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../lib/supabase';

export default function LoginPage() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await signIn(email, password);

    if (error) {
      console.error('Login error:', error);
      const status = 'status' in error ? (error as any).status : undefined;

      if (error.message.includes('Invalid login credentials') || status === 400) {
        setMessage({
          type: 'error',
          text: 'Email o password non corretti. Verifica i dati inseriti e riprova.'
        });
      } else if (error.message.includes('Email not confirmed') || error.message.includes('email_not_confirmed')) {
        setMessage({
          type: 'error',
          text: 'Email non confermata. Controlla la tua casella di posta e clicca sul link di conferma, oppure contattaci direttamente per completare la prenotazione.'
        });
      } else if (status === 422) {
        setMessage({
          type: 'error',
          text: 'Dati inseriti non validi. Controlla email e password.'
        });
      } else if (typeof status === 'number' && status >= 500) {
        setMessage({
          type: 'error',
          text: 'Errore del server. Riprova più tardi.'
        });
      } else {
        setMessage({ type: 'error', text: `Errore durante l'accesso: ${error.message}` });
      }
    } else {
      setMessage({ type: 'success', text: 'Accesso effettuato con successo!' });
      setTimeout(() => navigate('/'), 1000);
    }

    setLoading(false);
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetLoading(true);
    setMessage(null);

    if (!resetEmail) {
      setMessage({ type: 'error', text: 'Inserisci la tua email per il reset della password' });
      setResetLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/reset-password`
      });

      if (error) {
        if (error.message.includes('Invalid email')) {
          setMessage({ type: 'error', text: 'Formato email non valido' });
        } else {
          setMessage({ type: 'error', text: 'Errore durante il reset. Riprova più tardi.' });
        }
      } else {
        setMessage({
          type: 'success',
          text: 'Email di reset inviata! Controlla la tua casella di posta.'
        });
        setShowResetForm(false);
        setResetEmail('');
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Errore durante il reset. Riprova più tardi.' });
    }

    setResetLoading(false);
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
              Accedi al tuo Account
            </h1>
            <p className="text-gray-600">
              Accedi per gestire le tue prenotazioni
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-xl p-8">
            {message && (
              <div className={`p-4 rounded-lg mb-6 ${message.type === 'error'
                  ? 'bg-red-50 border border-red-200 text-red-700'
                  : 'bg-green-50 border border-green-200 text-green-700'
                }`}>
                {message.text}
              </div>
            )}

            {!showResetForm ? (
              <form onSubmit={handleSubmit} className="space-y-6">
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
                      className="w-full p-3 pr-12 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                      placeholder="La tua password"
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

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  {loading ? 'Accesso in corso...' : 'Accedi'}
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setShowResetForm(true)}
                    className="text-yellow-600 hover:text-yellow-700 font-medium text-sm flex items-center justify-center mx-auto"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Password dimenticata?
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handlePasswordReset} className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Reset Password</h3>
                  <p className="text-gray-600 text-sm">
                    Inserisci la tua email per ricevere il link di reset
                  </p>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email
                  </label>
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    required
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                    placeholder="La tua email registrata"
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowResetForm(false);
                      setResetEmail('');
                      setMessage(null);
                    }}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition-colors"
                  >
                    Annulla
                  </button>
                  <button
                    type="submit"
                    disabled={resetLoading}
                    className="flex-1 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition-colors"
                  >
                    {resetLoading ? 'Invio...' : 'Invia Reset'}
                  </button>
                </div>
              </form>
            )}

            {!showResetForm && (
              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  Non hai un account?{' '}
                  <Link to="/signup" className="text-yellow-600 hover:text-yellow-700 font-semibold">
                    Registrati
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}