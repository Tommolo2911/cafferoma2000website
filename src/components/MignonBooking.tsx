import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, ShoppingCart, User, Phone, Mail, Calendar, Clock, Trash2, ChefHat, AlertTriangle, Star } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useBooking } from '../hooks/useBooking';

interface MignonItem {
  id: string;
  product: string;
  quantity: number;
}

interface MonoporzioneItem {
  id: string;
  product: string;
  quantity: number;
}

interface FormData {
  items: MignonItem[];
  monoporzioni: MonoporzioneItem[];
  name: string;
  phone: string;
  email: string;
  pickupDate: string;
  pickupTime: string;
  notes: string;
}

export default function MignonBooking() {
  const { user } = useAuth();
  const { createBooking, loading: bookingLoading } = useBooking();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const [formData, setFormData] = useState<FormData>({
    items: [{ id: '1', product: '', quantity: 1 }],
    monoporzioni: [{ id: '1', product: '', quantity: 1 }],
    name: '',
    phone: '',
    email: '',
    pickupDate: '',
    pickupTime: '',
    notes: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Prodotti disponibili - solo 2 tipologie
  const mignonProducts = [
    'Zeppoline',
    'Mignon Miste Assortite'
  ];

  const monoporzioniProducts = [
    'Tiramisù',
    'Mousse ai tre cioccolati',
    'Mousse di ricotta e pistacchio',
    'Mousse ai frutti di bosco',
    'Cheesecake ai frutti di bosco'
  ];

  const calculateTotal = () => {
    const mignonTotal = formData.items.reduce((total, item) => {
      if (item.product && item.quantity) {
        return total + (item.quantity * 1.00); // €1 per pezzo
      }
      return total;
    }, 0);

    const monoporzioniTotal = formData.monoporzioni.reduce((total, item) => {
      if (item.product && item.quantity) {
        return total + (item.quantity * 3.00); // €3 per monoporzione
      }
      return total;
    }, 0);

    return mignonTotal + monoporzioniTotal;
  };

  const getTotalPieces = () => {
    return formData.items.reduce((total, item) => {
      if (item.product && item.quantity) {
        return total + item.quantity;
      }
      return total;
    }, 0);
  };

  const addItem = () => {
    const newId = Date.now().toString();
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { id: newId, product: '', quantity: 1 }]
    }));
  };

  const removeItem = (id: string) => {
    if (formData.items.length > 1) {
      setFormData(prev => ({
        ...prev,
        items: prev.items.filter(item => item.id !== id)
      }));
    }
  };

  const addMonoporzione = () => {
    const newId = Date.now().toString();
    setFormData(prev => ({
      ...prev,
      monoporzioni: [...prev.monoporzioni, { id: newId, product: '', quantity: 1 }]
    }));
  };

  const removeMonoporzione = (id: string) => {
    if (formData.monoporzioni.length > 1) {
      setFormData(prev => ({
        ...prev,
        monoporzioni: prev.monoporzioni.filter(item => item.id !== id)
      }));
    }
  };

  const updateMonoporzione = (id: string, field: keyof MonoporzioneItem, value: any) => {
    setFormData(prev => ({
      ...prev,
      monoporzioni: prev.monoporzioni.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const updateItem = (id: string, field: keyof MignonItem, value: any) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const updateFormField = (field: keyof Omit<FormData, 'items'>, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validate items
    const validItems = formData.items.filter(item => item.product && item.quantity > 0);
    const validMonoporzioni = formData.monoporzioni.filter(item => item.product && item.quantity > 0);

    if (validItems.length === 0 && validMonoporzioni.length === 0) {
      newErrors.items = 'Seleziona almeno un prodotto mignon o una monoporzione';
    }

    // Validate contact info
    if (!formData.name.trim()) newErrors.name = 'Inserisci nome e cognome';
    if (!formData.phone.trim()) newErrors.phone = 'Inserisci il numero di telefono';
    if (!formData.email.trim()) newErrors.email = 'Inserisci la tua email';
    if (!formData.pickupDate) newErrors.pickupDate = 'Seleziona la data di ritiro';
    if (!formData.pickupTime) newErrors.pickupTime = 'Seleziona l\'orario di ritiro';

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Inserisci un\'email valida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      handleBookingSubmit();
    }
  };

  const handleBookingSubmit = async () => {
    const bookingData = {
      booking_type: 'mignon',
      customer_name: formData.name,
      customer_phone: formData.phone,
      customer_email: formData.email,
      pickup_date: formData.pickupDate,
      pickup_time: formData.pickupTime,
      total_amount: calculateTotal(),
      notes: formData.notes,
      booking_data: {
        items: formData.items.filter(item => item.product && item.quantity > 0),
        monoporzioni: formData.monoporzioni.filter(item => item.product && item.quantity > 0)
      }
    };

    const { data, error } = await createBooking(bookingData);

    if (error) {
      console.error('Errore durante la prenotazione:', error);
    } else {
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-32 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingCart className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-blue-900 mb-6 font-serif">
              Prenotazione Confermata!
            </h1>
            <div className="w-24 h-1 bg-yellow-600 mx-auto mb-8" />
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Ti ricontatteremo al più presto per confermare i dettagli.
            </p>

            <div className="bg-blue-50 p-6 rounded-lg mb-8">
              <p className="text-blue-900 font-semibold mb-4">Riepilogo del tuo ordine:</p>
              <div className="text-left space-y-3 text-gray-700">
                {formData.items.filter(item => item.product && item.quantity > 0).map((item, index) => (
                  <div key={index} className="border-b border-blue-200 pb-2">
                    <p><strong>{item.quantity}x {item.product}</strong></p>
                  </div>
                ))}
                {formData.monoporzioni.filter(item => item.product && item.quantity > 0).map((item, index) => (
                  <div key={`mono-${index}`} className="border-b border-blue-200 pb-2">
                    <p><strong>{item.quantity}x {item.product} (monoporzione)</strong></p>
                  </div>
                ))}
                <p className="pt-2 text-lg"><strong>Totale pezzi ordinati:</strong> {getTotalPieces()}</p>
                <p><strong>Ritiro:</strong> {formData.pickupDate} alle {formData.pickupTime}</p>
                <p className="text-lg font-bold text-green-600"><strong>Totale:</strong> €{calculateTotal().toFixed(2)}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Torna alla Home
              </Link>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    items: [{ id: '1', product: '', quantity: 1 }],
                    monoporzioni: [{ id: '1', product: '', quantity: 1 }],
                    name: '',
                    phone: '',
                    email: '',
                    pickupDate: '',
                    pickupTime: '',
                    notes: ''
                  });
                }}
                className="border-2 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
              >
                Nuovo Ordine
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Link
              to="/pasticceria"
              className="inline-flex items-center text-blue-900 hover:text-yellow-600 transition-colors mb-8"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Torna alla Pasticceria
            </Link>

            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6 font-serif">
              PRENOTA LA TUA
              <span className="block text-yellow-600"> MIGNON</span>
            </h1>
            <div className="w-24 h-1 bg-yellow-600 mx-auto mb-8" />

            {/* Info badges */}
            <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <ChefHat className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-blue-900">Zeppoline</p>
                <p className="text-xs text-gray-600">Fresche ogni giorno</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <Star className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-blue-900">Mix di Mignon</p>
                <p className="text-xs text-gray-600">Assortimento variegato</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <ShoppingCart className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-blue-900">Vassoi</p>
                <p className="text-xs text-gray-600">Fino a 50 pezzi</p>
              </div>
            </div>

            <div className="mt-6 bg-red-50 border border-red-200 p-4 rounded-lg">
              <p className="text-red-700 font-semibold">⚠️ Chiusi il Martedì</p>
              <p className="text-sm text-red-600">Ricorda che siamo chiusi ogni martedì</p>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-xl p-8 md:p-12">

              {/* Selezione Prodotti */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-blue-900 flex items-center">
                    <ChefHat className="w-5 h-5 mr-2" />
                    Seleziona i tuoi mignon
                  </h3>
                  <div className="text-sm text-gray-600">
                    Totale: <span className="font-semibold text-blue-900">{getTotalPieces()} pezzi</span>
                  </div>
                </div>

                {errors.items && <p className="text-red-500 text-sm mb-4">{errors.items}</p>}

                <div className="space-y-6">
                  {formData.items.map((item, index) => (
                    <div key={item.id} className="border-2 border-gray-200 rounded-lg p-6 relative">
                      {formData.items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}

                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Prodotto */}
                        <div>
                          <label className="block text-gray-700 font-medium mb-2">
                            Prodotto <span className="text-red-500">*</span>
                          </label>
                          <select
                            value={item.product}
                            onChange={(e) => updateItem(item.id, 'product', e.target.value)}
                            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                          >
                            <option value="">Seleziona prodotto</option>
                            {mignonProducts.map(product => (
                              <option key={product} value={product}>{product}</option>
                            ))}
                          </select>
                        </div>

                        {/* Quantità Pezzi */}
                        <div>
                          <label className="block text-gray-700 font-medium mb-2">
                            Numero di Pezzi <span className="text-red-500">*</span> (Max 50)
                          </label>
                          <div className="flex items-center space-x-3">
                            <button
                              type="button"
                              onClick={() => updateItem(item.id, 'quantity', Math.max(1, item.quantity - 1))}
                              className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <input
                              type="number"
                              min="1"
                              max="50"
                              value={item.quantity}
                              onChange={(e) => updateItem(item.id, 'quantity', Math.min(50, Math.max(1, parseInt(e.target.value) || 1)))}
                              className="w-20 p-3 border-2 border-gray-200 rounded-lg text-center focus:border-yellow-400 focus:outline-none transition-colors"
                            />
                            <button
                              type="button"
                              onClick={() => updateItem(item.id, 'quantity', Math.min(50, item.quantity + 1))}
                              className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={addItem}
                  className="mt-6 flex items-center justify-center w-full p-4 border-2 border-dashed border-yellow-400 rounded-lg text-yellow-600 hover:bg-yellow-50 transition-colors"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Aggiungi altro prodotto
                </button>


              </div>

              {/* Dati di contatto */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-blue-900 mb-6 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Dati di contatto
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Nome completo <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => updateFormField('name', e.target.value)}
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                      placeholder="Il tuo nome e cognome"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Telefono <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateFormField('phone', e.target.value)}
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                      placeholder="Il tuo numero di telefono"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>
                <div className="mt-6">
                  <label className="block text-gray-700 font-medium mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormField('email', e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                    placeholder="La tua email"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Data e orario ritiro */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-blue-900 mb-6 flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Ritiro
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Data di ritiro <span className="text-red-500">*</span>
                    </label>
                    <div className="date-input-container">
                      <input
                        type="date"
                        value={formData.pickupDate}
                        onChange={(e) => updateFormField('pickupDate', e.target.value)}
                        min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
                        className="booking-date-input w-full p-3 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                        style={{
                          colorScheme: 'light'
                        }}
                        onInput={(e) => {
                          const selectedDate = new Date(e.currentTarget.value);
                          if (selectedDate.getDay() === 2) { // Tuesday
                            alert('Siamo chiusi il martedì! Seleziona un altro giorno.');
                            e.currentTarget.value = '';
                            e.currentTarget.style.borderColor = '#ff3b3b';
                            setTimeout(() => {
                              e.currentTarget.style.borderColor = '';
                            }, 2000);
                            return;
                          }
                        }}
                      />
                    </div>
                    {errors.pickupDate && <p className="text-red-500 text-sm mt-1">{errors.pickupDate}</p>}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      <Clock className="w-4 h-4 inline mr-2" />
                      Orario di ritiro <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.pickupTime}
                      onChange={(e) => updateFormField('pickupTime', e.target.value)}
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                    >
                      <option value="">Seleziona orario</option>
                      <option value="08:00">08:00</option>
                      <option value="09:00">09:00</option>
                      <option value="10:00">10:00</option>
                      <option value="11:00">11:00</option>
                      <option value="12:00">12:00</option>
                      <option value="13:00">13:00</option>
                      <option value="14:00">14:00</option>
                      <option value="15:00">15:00</option>
                      <option value="16:00">16:00</option>
                      <option value="17:00">17:00</option>
                      <option value="18:00">18:00</option>
                      <option value="19:00">19:00</option>
                      <option value="20:00">20:00</option>
                      <option value="21:00">21:00</option>
                    </select>
                    {errors.pickupTime && <p className="text-red-500 text-sm mt-1">{errors.pickupTime}</p>}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  * I mignon devono essere ordinati con almeno 24 ore di anticipo
                </p>
              </div>

              {/* Note */}
              <div className="mb-8">
                <label className="block text-gray-700 font-medium mb-2">
                  <AlertTriangle className="w-4 h-4 inline mr-2" />
                  Note aggiuntive (allergie, richieste particolari)
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => updateFormField('notes', e.target.value)}
                  placeholder="Specifica eventuali allergie, intolleranze o richieste particolari..."
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors resize-none"
                  rows={3}
                />
              </div>

              {/* Submit Button */}
              {getTotalPieces() > 0 && (
                <div className="text-center">
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-6">
                    <p className="text-blue-800 text-lg font-bold mb-2">
                      💰 Totale stimato: €{calculateTotal().toFixed(2)}
                    </p>
                    <p className="text-blue-700 text-sm">
                      Il pagamento avverrà al momento del ritiro. Ti ricontatteremo per confermare il prezzo finale.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={bookingLoading}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-12 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ShoppingCart className="w-5 h-5 inline mr-2" />
                    {bookingLoading ? 'Invio in corso...' : 'Conferma Prenotazione'}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
