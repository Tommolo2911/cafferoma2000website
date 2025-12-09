import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, ShoppingCart, User, Phone, Mail, Calendar, Clock, Trash2, Snowflake, AlertTriangle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useBooking } from '../hooks/useBooking';
interface VaschettaItem {
  id: string;
  flavors: string[];
  size: string;
  quantity: number;
}

interface FormData {
  items: VaschettaItem[];
  name: string;
  phone: string;
  email: string;
  pickupDate: string;
  pickupTime: string;
  notes: string;
}

export default function VaschettaGelatoBooking() {
  const { user } = useAuth();
  const { createBooking, loading: bookingLoading } = useBooking();
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const [formData, setFormData] = useState<FormData>({
    items: [{ id: '1', flavors: [], size: '500g', quantity: 1 }],
    name: '',
    phone: '',
    email: '',
    pickupDate: '',
    pickupTime: '',
    notes: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const vaschettaFlavors = [
    'Nocciola', 'Cioccolato', 'Fondente', 'Fiordilatte', 'Caffè', 
    'Tartufo bianco', 'Tartufo nero', 'Pistacchio', 'Panna e Nutella', 
    'Bueno', 'Fragola', 'Melone', 'Limone'
  ];

  const vaschettaSizes = ['0,5Kg', '0,75Kg', '1kg', '1,5Kg'];

  const calculateItemPrice = (item: VaschettaItem) => {
    if (!item.flavors.length || !item.quantity) return 0;
    
    const weightInKg = parseFloat(item.size.replace('kg', '').replace(',', '.'));
    return weightInKg * item.quantity * 18; // €18 al kg
  };

  const calculateTotal = () => {
    return formData.items.reduce((total, item) => total + calculateItemPrice(item), 0);
  };

  const addItem = () => {
    const newId = Date.now().toString();
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { id: newId, flavors: [], size: '500g', quantity: 1 }]
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

  const updateItem = (id: string, field: keyof VaschettaItem, value: any) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const toggleFlavor = (itemId: string, flavor: string) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map(item => 
        item.id === itemId 
          ? {
              ...item,
              flavors: item.flavors.includes(flavor)
                ? item.flavors.filter(f => f !== flavor)
                : [...item.flavors, flavor]
            }
          : item
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

    const validItems = formData.items.filter(item => 
      item.flavors.length > 0 && item.quantity > 0 && item.size
    );
    
    if (validItems.length === 0) {
      newErrors.items = 'Seleziona almeno una vaschetta con gusti e formato';
    }

    // Check flavor limits
    formData.items.forEach((item, index) => {
      if (item.flavors.length > 4) {
        newErrors[`item_${index}_flavors`] = 'Massimo 4 gusti per vaschetta';
      }
    });

    if (!formData.name.trim()) newErrors.name = 'Inserisci nome e cognome';
    if (!formData.phone.trim()) newErrors.phone = 'Inserisci il numero di telefono';
    if (!formData.email.trim()) newErrors.email = 'Inserisci la tua email';
    if (!formData.pickupDate) newErrors.pickupDate = 'Seleziona la data di ritiro';
    if (!formData.pickupTime) newErrors.pickupTime = 'Seleziona l\'orario di ritiro';

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
      booking_type: 'vaschette_gelato',
      customer_name: formData.name,
      customer_phone: formData.phone,
      customer_email: formData.email,
      pickup_date: formData.pickupDate,
      pickup_time: formData.pickupTime,
      total_amount: calculateTotal(),
      notes: formData.notes,
      booking_data: {
        items: formData.items.filter(item => item.flavors.length > 0 && item.quantity > 0)
      }
    };

    const { data, error } = await createBooking(bookingData);
    
    if (error) {
      console.error('Errore durante la prenotazione:', error);
      // You could show an error message to the user here
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
              <Snowflake className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-blue-900 mb-6 font-serif">
              Prenotazione Ricevuta!
            </h1>
            <div className="w-24 h-1 bg-yellow-600 mx-auto mb-8" />
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Ti ricontatteremo al più presto per confermare i dettagli del tuo ordine vaschette gelato.
            </p>
            
            <div className="bg-blue-50 p-6 rounded-lg mb-8">
              <p className="text-blue-900 font-semibold mb-4">Riepilogo del tuo ordine:</p>
              <div className="text-left space-y-3 text-gray-700">
                {formData.items.filter(item => item.flavors.length > 0 && item.quantity > 0).map((item, index) => (
                  <div key={index} className="border-b border-blue-200 pb-2">
                    <p><strong>{item.quantity}x Vaschetta {item.size}</strong></p>
                    <p className="text-sm">Gusti: {item.flavors.join(', ')}</p>
                  </div>
                ))}
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
                    items: [{ id: '1', flavors: [], size: '500g', quantity: 1 }],
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
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Link 
              to="/gelateria"
              className="inline-flex items-center text-blue-900 hover:text-yellow-600 transition-colors mb-8"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Torna alla Gelateria
            </Link>
            
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6 font-serif">
              PRENOTA LE TUE
              <span className="block text-yellow-600">VASCHETTE GELATO</span>
            </h1>
            <div className="w-24 h-1 bg-yellow-600 mx-auto mb-8" />
            <p className="text-xl text-gray-700 leading-relaxed mb-8 max-w-3xl mx-auto">
              Ordina vaschette di gelato artigianale da portare a casa. 
              Scegli tra i nostri gusti classici e formati disponibili.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-xl p-8 md:p-12">
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-blue-900 mb-6 flex items-center">
                  <Snowflake className="w-5 h-5 mr-2" />
                  Seleziona le tue vaschette gelato
                </h3>

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

                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label className="block text-gray-700 font-medium mb-2">
                            Formato <span className="text-red-500">*</span>
                          </label>
                          <select
                            value={item.size}
                            onChange={(e) => updateItem(item.id, 'size', e.target.value)}
                            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                          >
                            {vaschettaSizes.map(size => (
                              <option key={size} value={size}>{size}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-gray-700 font-medium mb-2">
                            Quantità <span className="text-red-500">*</span>
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
                              max="5"
                              value={item.quantity}
                              onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                              className="w-20 p-3 border-2 border-gray-200 rounded-lg text-center focus:border-yellow-400 focus:outline-none transition-colors"
                            />
                            <button
                              type="button"
                              onClick={() => updateItem(item.id, 'quantity', Math.min(5, item.quantity + 1))}
                              className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">
                          Gusti <span className="text-red-500">*</span>
                          <span className="text-sm text-gray-500 ml-2">
                            (Massimo 4 gusti)
                          </span>
                        </label>
                        <div className="grid md:grid-cols-3 gap-3">
                          {vaschettaFlavors.map(flavor => (
                            <label key={flavor} className="flex items-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-yellow-400 transition-colors">
                              <input
                                type="checkbox"
                                checked={item.flavors.includes(flavor)}
                                onChange={() => toggleFlavor(item.id, flavor)}
                                disabled={
                                  !item.flavors.includes(flavor) && 
                                  item.flavors.length >= 4
                                }
                                className="w-4 h-4 text-yellow-600 mr-3"
                              />
                              <span className="text-sm text-gray-700">{flavor}</span>
                            </label>
                          ))}
                        </div>
                        {errors[`item_${index}_flavors`] && (
                          <p className="text-red-500 text-sm mt-2">{errors[`item_${index}_flavors`]}</p>
                        )}
                      </div>

                      {item.flavors.length > 0 && (
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <p className="text-blue-900 font-medium text-sm">
                            {item.quantity}x Vaschetta {item.size} - €{calculateItemPrice(item).toFixed(2)}
                            <br />Gusti: {item.flavors.join(', ')}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={addItem}
                  className="mt-6 flex items-center justify-center w-full p-4 border-2 border-dashed border-yellow-400 rounded-lg text-yellow-600 hover:bg-yellow-50 transition-colors"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Aggiungi altra vaschetta
                </button>
              </div>

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
                          const inputElement = e.currentTarget;
                          const selectedDate = new Date(e.currentTarget.value);
                          if (selectedDate.getDay() === 2) { // Tuesday
                            e.currentTarget.value = '';
                            e.currentTarget.style.borderColor = '#ff3b3b';
                            setTimeout(() => {
                              if (inputElement && document.body.contains(inputElement)) {
                                inputElement.style.borderColor = '';
                              }
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
                  * Le vaschette gelato possono essere prenotate con 24 ore di anticipo
                </p>
              </div>

              <div className="mb-8">
                <label className="block text-gray-700 font-medium mb-2">
                  <AlertTriangle className="w-4 h-4 inline mr-2" />
                  Note aggiuntive
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => updateFormField('notes', e.target.value)}
                  placeholder="Richieste particolari, allergie o altre informazioni utili..."
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors resize-none"
                  rows={3}
                />
              </div>

              <div className="text-center">
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-6">
                  <p className="text-blue-800 text-lg font-bold mb-2">
                    💰 Totale stimato: €{calculateTotal().toFixed(2)}
                  </p>
                  <p className="text-blue-700 text-sm">
                    Il pagamento avverrà al momento del ritiro
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={bookingLoading}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-12 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <Snowflake className="w-5 h-5 inline mr-2" />
                  {bookingLoading ? 'Invio in corso...' : 'Conferma Prenotazione'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}