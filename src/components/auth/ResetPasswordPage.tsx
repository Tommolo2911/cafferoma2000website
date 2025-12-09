import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Lock, ArrowLeft, Coffee, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  // Get tokens from URL
  const accessToken = searchParams.get('access_token');
  const refreshToken = searchParams.get('refresh_token');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Check if we have the required tokens
    if (!accessToken || !refreshToken) {
      setMessage({ 
        type: 'error', 
        text: 'Link di reset non valido o scaduto. Richiedi un nuovo reset password.' 
      });
    }
  }, [accessToken, refreshToken]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // Validation
    if (password.length < 6) {
      setMessage({ type: 'error', text: 'La password deve essere di almeno 6 caratteri' });
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setMessage({ type: 'error', text: 'Le password non coincidono' });
      setLoading(false);
      return;
    }

    if (!accessToken || !refreshToken) {
      setMessage({ type: 'error', text: 'Token di reset non valido' });
      setLoading(false);
      return;
    }

    try {
      // Set the session with the tokens from the URL
      const { error: sessionError } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      if (sessionError) {
        throw sessionError;
      }

      // Update the password
      const { error: updateError } = await supabase.auth.updateUser({
        password: password
      });

      if (updateError) {
        if (updateError.message.includes('Password should be at least')) {
          setMessage({ type: 'error', text: 'La password deve essere di almeno 6 caratteri' });
        } else if (updateError.message.includes('same as the old password')) {
          setMessage({ type: 'error', text: 'La nuova password deve essere diversa da quella precedente' });
        } else {
          setMessage({ type: 'error', text: `Errore durante l'aggiornamento: ${updateError.message}` });
        }
      } else {
        setIsSuccess(true);
        setMessage({ 
          type: 'success', 
          text: 'Password aggiornata! Ora puoi accedere con la tua nuova password.' 
        });
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    } catch (err: any) {
      console.error('Reset password error:', err);
      if (err.message?.includes('Invalid refresh token')) {
        setMessage({ 
          type: 'error', 
          text: 'Link di reset scaduto. Richiedi un nuovo reset password.' 
        });
      } else {
        setMessage({ 
          type: 'error', 
          text: 'Errore durante il reset. Riprova più tardi.' 
        });
      }
    }

    setLoading(false);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen pt-32 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 flex items-center justify-center">
                  <svg 
                    viewBox="0 0 24 24" 
                    className="w-16 h-16"
                    fill="none"
                  >
                    <circle cx="12" cy="8" r="3" fill="#FFD700" />
                    <circle cx="12" cy="5" r="2.5" fill="#FF69B4" />
                    <circle cx="12" cy="2.5" r="2" fill="#87CEEB" />
                    <path 
                      d="M9 11 L12 20 L15 11 Z" 
                      fill="#D2691E" 
                      stroke="#8B4513" 
                      strokeWidth="0.5"
                    />
                    <path 
                      d="M9.5 12 L14.5 12 M10 14 L14 14 M10.5 16 L13.5 16 M11 18 L13 18" 
                      stroke="#8B4513" 
                      strokeWidth="0.3"
                    />
                  </svg>
                </div>
              </div>
              <h1 className="text-2xl font-bold text-blue-900 mb-2 font-serif">
                CAFFÈ ROMA 2000
              </h1>
              <p className="text-sm text-gray-600 tracking-wider mb-8">
                COFFEE, PASTRY AND ICE CREAM SHOP
              </p>
              
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              
              <h2 className="text-3xl font-bold text-blue-900 mb-4 font-serif">
                Password Aggiornata!
              </h2>
              <p className="text-gray-600 mb-8">
                Ora puoi accedere con la tua nuova password.
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

              <div className="text-center space-y-4">
                <Link 
                  to="/login"
                  className="block w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Accedi ora
                </Link>
                
                <Link 
                  to="/"
                  className="block w-full border-2 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Torna alla Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <Link 
              to="/login"
              className="inline-flex items-center text-blue-900 hover:text-yellow-600 transition-colors mb-8"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Torna al Login
            </Link>
            
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 flex items-center justify-center">
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-16 h-16"
                  fill="none"
                >
                  <circle cx="12" cy="8" r="3" fill="#FFD700" />
                  <circle cx="12" cy="5" r="2.5" fill="#FF69B4" />
                  <circle cx="12" cy="2.5" r="2" fill="#87CEEB" />
                  <path 
                    d="M9 11 L12 20 L15 11 Z" 
                    fill="#D2691E" 
                    stroke="#8B4513" 
                    strokeWidth="0.5"
                  />
                  <path 
                    d="M9.5 12 L14.5 12 M10 14 L14 14 M10.5 16 L13.5 16 M11 18 L13 18" 
                    stroke="#8B4513" 
                    strokeWidth="0.3"
                  />
                </svg>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-blue-900 mb-2 font-serif">
              CAFFÈ ROMA 2000
            </h1>
            <p className="text-sm text-gray-600 tracking-wider mb-8">
              COFFEE, PASTRY AND ICE CREAM SHOP
            </p>
            
            <h2 className="text-3xl font-bold text-blue-900 mb-4 font-serif">
              Reimposta la tua password
            </h2>
            <p className="text-gray-600">
              Inserisci qui la nuova password per accedere nuovamente al tuo account.
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
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  <Lock className="w-4 h-4 inline mr-2" />
                  Nuova password
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
                  Conferma nuova password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full p-3 pr-12 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                    placeholder="Ripeti la nuova password"
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
                disabled={loading || !accessToken || !refreshToken}
                className="w-full bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                {loading ? 'Aggiornamento in corso...' : 'Reimposta password'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Ricordi la tua password?{' '}
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