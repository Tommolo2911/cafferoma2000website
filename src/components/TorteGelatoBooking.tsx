import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, ShoppingCart, User, Phone, Mail, Calendar, Clock, Trash2, Snowflake, AlertTriangle, MessageSquare } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useBooking } from '../hooks/useBooking';
interface TortaGelatoItem {
  id: string;
  type: string;
  flavors: string[];
  format: string;
  message: string;
  quantity: number;
}

interface SpumoneItem {
  id: string;
  quantity: number;
}

interface TartufoMonoItem {
  id: string;
  type: 'Tartufo Nero' | 'Tartufo Bianco' | '';
  quantity: number;
}

interface FormData {
  items: TortaGelatoItem[];
  spumoni: SpumoneItem[];
  tartufiMono: TartufoMonoItem[];
  name: string;
  phone: string;
  email: string;
  pickupDate: string;
  pickupTime: string;
  notes: string;
}

export default function TorteGelatoBooking() {
  const { user } = useAuth();
  const { createBooking, loading: bookingLoading } = useBooking();
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const [formData, setFormData] = useState<FormData>({
    items: [{ id: '1', type: '', flavors: [], format: '', message: '', quantity: 1 }],
    spumoni: [{ id: '1', quantity: 1 }],
    tartufiMono: [{ id: '1', type: '', quantity: 1 }],
    name: '',
    phone: '',
    email: '',
    pickupDate: '',
    pickupTime: '',
    notes: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const tortaTypes = {
    'Torta Gelato Classica': {
      flavors: ['Nocciola', 'Cioccolato', 'Fondente', 'Fiordilatte', 'Caffè', 'Pistacchio'],
      formats: ['6/8 persone', '10/12 persone', '18/20 persone']
    },
    'Tartufo Nero': {
      flavors: ['Tartufo Nero'],
      formats: ['6/8 persone', '10/12 persone']
    },
    'Tartufo Bianco': {
      flavors: ['Tartufo Bianco'],
      formats: ['6/8 persone', '10/12 persone']
    },
    'Mars': {
      flavors: ['Mars'],
      formats: ['6/8 persone', '10/12 persone']
    },
    'Tartufo al Limone': {
      flavors: ['Tartufo al Limone'],
      formats: ['6/8 persone', '10/12 persone']
    },
    'Torta Yogurt': {
      flavors: ['Frutti di Bosco', 'Passion Fruit', 'Fragole'],
      formats: ['6/8 persone', '10/12 persone']
    }
  };

  const calculateItemPrice = (item: TortaGelatoItem) => {
    if (!item.type || !item.format || !item.quantity) return 0;
    
    let weightInKg = 0;
    if (item.format === '6/8 persone') weightInKg = 1.0;
    else if (item.format === '10/12 persone') weightInKg = 1.5;
    else if (item.format === '18/20 persone') weightInKg = 2;
    
    return weightInKg * item.quantity * 20; // €20 al kg per torte gelato
  };

  const calculateTotal = () => {
    const torteTotal = formData.items.reduce((total, item) => total + calculateItemPrice(item), 0);
    const spumoniTotal = formData.spumoni.reduce((total, item) => total + (item.quantity * 7.00), 0);
    const tartufiMonoTotal = formData.tartufiMono.reduce((total, item) => {
      if (item.type && item.quantity) {
        return total + (item.quantity * 3.00);
      }
      return total;
    }, 0);
    
    return torteTotal + spumoniTotal + tartufiMonoTotal;
  };

  const addItem = () => {
    const newId = Date.now().toString();
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { id: newId, type: '', flavors: [], format: '', message: '', quantity: 1 }]
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

  const addSpumone = () => {
    const newId = Date.now().toString();
    setFormData(prev => ({
      ...prev,
      spumoni: [...prev.spumoni, { id: newId, quantity: 1 }]
    }));
  };

  const removeSpumone = (id: string) => {
    if (formData.spumoni.length > 1) {
      setFormData(prev => ({
        ...prev,
        spumoni: prev.spumoni.filter(item => item.id !== id)
      }));
    }
  };

  const updateSpumone = (id: string, field: keyof SpumoneItem, value: any) => {
    setFormData(prev => ({
      ...prev,
      spumoni: prev.spumoni.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const addTartufoMono = () => {
    const newId = Date.now().toString();
    setFormData(prev => ({
      ...prev,
      tartufiMono: [...prev.tartufiMono, { id: newId, type: '', quantity: 1 }]
    }));
  };

  const removeTartufoMono = (id: string) => {
    if (formData.tartufiMono.length > 1) {
      setFormData(prev => ({
        ...prev,
        tartufiMono: prev.tartufiMono.filter(item => item.id !== id)
      }));
    }
  };

  const updateTartufoMono = (id: string, field: keyof TartufoMonoItem, value: any) => {
    setFormData(prev => ({
      ...prev,
      tartufiMono: prev.tartufiMono.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const updateItem = (id: string, field: keyof TortaGelatoItem, value: any) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map(item => 
        item.id === id ? { 
          ...item, 
          [field]: value,
          // Reset flavors and format when type changes
          ...(field === 'type' ? { flavors: [], format: '' } : {})
        } : item
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
      item.type && item.format && item.quantity > 0 && 
      (item.type === 'Torta Gelato Classica' ? item.flavors.length > 0 : true)
    );
    
    const validSpumoni = formData.spumoni.filter(item => item.quantity > 0);
    const validTartufiMono = formData.tartufiMono.filter(item => item.type && item.quantity > 0);
    
    if (validItems.length === 0 && validSpumoni.length === 0 && validTartufiMono.length === 0) {
      newErrors.items = 'Seleziona almeno un prodotto';
    }

    // Check flavor limits for classic gelato cakes
    formData.items.forEach((item, index) => {
      if (item.type === 'Torta Gelato Classica' && item.flavors.length > 3) {
        newErrors[`item_${index}_flavors`] = 'Massimo 3 gusti per torta gelato';
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
      booking_type: 'torte_gelato',
      customer_name: formData.name,
      customer_phone: formData.phone,
      customer_email: formData.email,
      pickup_date: formData.pickupDate,
      pickup_time: formData.pickupTime,
      total_amount: calculateTotal(),
      notes: formData.notes,
      booking_data: {
        items: formData.items.filter(item => item.type && item.quantity > 0),
        spumoni: formData.spumoni.filter(item => item.quantity > 0),
        tartufiMono: formData.tartufiMono.filter(item => item.type && item.quantity > 0)
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
              Ti ricontatteremo al più presto per confermare i dettagli delle tue torte gelato.
            </p>
            
            <div className="bg-blue-50 p-6 rounded-lg mb-8">
              <p className="text-blue-900 font-semibold mb-4">Riepilogo del tuo ordine:</p>
              <div className="text-left space-y-3 text-gray-700">
                {formData.items.filter(item => item.type && item.quantity > 0).map((item, index) => (
                  <div key={index} className="border-b border-blue-200 pb-2">
                    <p><strong>{item.quantity}x {item.type} ({item.format})</strong></p>
                    {item.flavors.length > 0 && <p className="text-sm">Gusti: {item.flavors.join(', ')}</p>}
                    {item.message && <p className="text-sm">Scritta: "{item.message}"</p>}
                  </div>
                ))}
                {formData.spumoni.filter(item => item.quantity > 0).map((item, index) => (
                  <div key={`spumone-${index}`} className="border-b border-blue-200 pb-2">
                    <p><strong>{item.quantity}x Spumone (4 porzioni cad.)</strong></p>
                  </div>
                ))}
                {formData.tartufiMono.filter(item => item.type && item.quantity > 0).map((item, index) => (
                  <div key={`tartufo-${index}`} className="border-b border-blue-200 pb-2">
                    <p><strong>{item.quantity}x {item.type} (monoporzione)</strong></p>
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
                    items: [{ id: '1', type: '', flavors: [], format: '', message: '', quantity: 1 }],
                    spumoni: [{ id: '1', quantity: 1 }],
                    tartufiMono: [{ id: '1', type: '', quantity: 1 }],
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
              <span className="block text-yellow-600">TORTE GELATO</span>
            </h1>
            <div className="w-24 h-1 bg-yellow-600 mx-auto mb-8" />
            <p className="text-xl text-gray-700 leading-relaxed mb-8 max-w-3xl mx-auto">
              Ordina torte gelato personalizzate per le tue occasioni speciali. 
              Scegli tra le nostre specialità e crea la torta perfetta per te.
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg mb-8 max-w-2xl mx-auto">
              <p className="text-blue-800 text-sm font-medium">
                <Snowflake className="w-4 h-4 inline mr-2" />
                Prenotazione richiesta con 48 ore di anticipo
              </p>
            </div>
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
                  Seleziona le tue torte gelato
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

                      <div className="grid md:grid-cols-3 gap-6 mb-6">
                        <div>
                          <label className="block text-gray-700 font-medium mb-2">
                            Tipo Torta <span className="text-red-500">*</span>
                          </label>
                          <select
                            value={item.type}
                            onChange={(e) => updateItem(item.id, 'type', e.target.value)}
                            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                          >
                            <option value="">Seleziona tipo</option>
                            {Object.keys(tortaTypes).map(type => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-gray-700 font-medium mb-2">
                            Formato <span className="text-red-500">*</span>
                          </label>
                          <select
                            value={item.format}
                            onChange={(e) => updateItem(item.id, 'format', e.target.value)}
                            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                            disabled={!item.type}
                          >
                            <option value="">Seleziona formato</option>
                            {item.type && tortaTypes[item.type as keyof typeof tortaTypes]?.formats.map(format => (
                              <option key={format} value={format}>{format}</option>
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

                      {/* Gusti per Torta Gelato Classica e Torta Yogurt */}
                      {item.type && (item.type === 'Torta Gelato Classica' || item.type === 'Torta Yogurt') && (
                        <div className="mb-6">
                          <label className="block text-gray-700 font-medium mb-2">
                            {item.type === 'Torta Yogurt' ? 'Variante' : 'Gusti'} <span className="text-red-500">*</span>
                            {item.type === 'Torta Gelato Classica' && (
                              <span className="text-sm text-gray-500 ml-2">
                                (Massimo 3 gusti)
                              </span>
                            )}
                          </label>
                          <div className="grid md:grid-cols-3 gap-3">
                            {tortaTypes[item.type as keyof typeof tortaTypes]?.flavors.map(flavor => (
                              <label key={flavor} className="flex items-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-yellow-400 transition-colors">
                                <input
                                  type={item.type === 'Torta Yogurt' ? 'radio' : 'checkbox'}
                                  name={item.type === 'Torta Yogurt' ? `flavors-${item.id}` : undefined}
                                  checked={item.flavors.includes(flavor)}
                                  onChange={() => {
                                    if (item.type === 'Torta Yogurt') {
                                      // Radio behavior for Torta Yogurt
                                      updateItem(item.id, 'flavors', [flavor]);
                                    } else {
                                      // Checkbox behavior for Torta Gelato Classica
                                      toggleFlavor(item.id, flavor);
                                    }
                                  }}
                                  disabled={
                                    item.type === 'Torta Gelato Classica' &&
                                    !item.flavors.includes(flavor) && 
                                    item.flavors.length >= 3
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
                      )}

                      {/* Scritta sulla torta */}
                      {item.type && (
                        <div className="mb-4">
                          <label className="block text-gray-700 font-medium mb-2">
                            <MessageSquare className="w-4 h-4 inline mr-2" />
                            Scritta sulla torta (opzionale)
                          </label>
                          <input
                            type="text"
                            value={item.message}
                            onChange={(e) => updateItem(item.id, 'message', e.target.value)}
                            placeholder="Es. Buon Compleanno Maria!"
                            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                          />
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
                  Aggiungi altra torta gelato
                </button>

                {/* Spumoni Section */}
                <div className="mt-8 border-t border-gray-200 pt-6">
                  <h4 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                    <Snowflake className="w-5 h-5 mr-2 text-yellow-600" />
                    Spumoni
                  </h4>
                  
                  <div className="space-y-4">
                    {formData.spumoni.map((item, index) => (
                      <div key={item.id} className="border border-blue-200 rounded-lg p-4 bg-blue-50 relative">
                        {formData.spumoni.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeSpumone(item.id)}
                            className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}

                        <div className="flex items-center space-x-4">
                          <div className="flex-1">
                              Spumone                                                  
                          </div>
                          
                          <div>
                            <label className="block text-gray-700 font-medium mb-2 text-sm">
                              Quantità
                            </label>
                            <div className="flex items-center space-x-2">
                              <button
                                type="button"
                                onClick={() => updateSpumone(item.id, 'quantity', Math.max(1, item.quantity - 1))}
                                className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <input
                                type="number"
                                min="1"
                                max="10"
                                value={item.quantity}
                                onChange={(e) => updateSpumone(item.id, 'quantity', Math.min(10, parseInt(e.target.value) || 1))}
                                className="w-16 p-2 border border-gray-300 rounded-lg text-center focus:border-yellow-400 focus:outline-none transition-colors text-sm"
                              />
                              <button
                                type="button"
                                onClick={() => updateSpumone(item.id, 'quantity', Math.min(10, item.quantity + 1))}
                                className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tartufi Monoporzione Section */}
                <div className="mt-8 border-t border-gray-200 pt-6">
                  <h4 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                    <Snowflake className="w-5 h-5 mr-2 text-yellow-600" />
                    Tartufi Monoporzione 
                  </h4>
                  
                  <div className="space-y-4">
                    {formData.tartufiMono.map((item, index) => (
                      <div key={item.id} className="border border-blue-200 rounded-lg p-4 bg-blue-50 relative">
                        {formData.tartufiMono.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeTartufoMono(item.id)}
                            className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                           
                              Tipo Tartufo
                     
                            <select
                              value={item.type}
                              onChange={(e) => updateTartufoMono(item.id, 'type', e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors text-sm"
                            >
                              <option value="">Seleziona</option>
                              <option value="Tartufo Nero">Tartufo Nero</option>
                              <option value="Tartufo Bianco">Tartufo Bianco</option>
                            </select>
                          </div>
                          
                          <div>
                            <label className="block text-gray-700 font-medium mb-2 text-sm">
                              Quantità
                            </label>
                            <div className="flex items-center space-x-2">
                              <button
                                type="button"
                                onClick={() => updateTartufoMono(item.id, 'quantity', Math.max(1, item.quantity - 1))}
                                className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <input
                                type="number"
                                min="1"
                                max="10"
                                value={item.quantity}
                                onChange={(e) => updateTartufoMono(item.id, 'quantity', Math.min(10, parseInt(e.target.value) || 1))}
                                className="w-16 p-2 border border-gray-300 rounded-lg text-center focus:border-yellow-400 focus:outline-none transition-colors text-sm"
                              />
                              <button
                                type="button"
                                onClick={() => updateTartufoMono(item.id, 'quantity', Math.min(10, item.quantity + 1))}
                                className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {item.type && (
                          <div className="mt-3 bg-white p-2 rounded border border-blue-300">
                            <p className="text-blue-800 font-medium text-sm">
                              {item.quantity}x {item.type} (monoporzione) - €{(item.quantity * 3.00).toFixed(2)}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={addTartufoMono}
                    className="mt-4 flex items-center justify-center w-full p-3 border-2 border-dashed border-blue-400 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors text-sm"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Aggiungi altro tartufo monoporzione
                  </button>
                </div>
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
                        min={new Date(Date.now() + 172800000).toISOString().split('T')[0]}
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
                  * Le torte gelato devono essere prenotate con 48 ore di anticipo
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