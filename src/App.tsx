import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Footer from './components/Footer';
import Pasticceria from './components/Pasticceria';
import Gelateria from './components/Gelateria';
import Caffetteria from './components/Caffetteria';
import CakeBooking from './components/CakeBooking';
import CornettiBooking from './components/CornettiBooking';
import UnifiedBooking from './components/UnifiedBooking';
import MignonBooking from './components/MignonBooking';
import FrolliniBooking from './components/FrolliniBooking';
import PasticciottBooking from './components/PasticciottBooking';
import PasteMandorlaBooking from './components/PasteMandorlaBooking';
import VaschettaGelatoBooking from './components/VaschettaGelatoBooking';
import TorteGelatoBooking from './components/TorteGelatoBooking';
import LoginPage from './components/auth/LoginPage';
import SignupPage from './components/auth/SignupPage';
import ResetPasswordPage from './components/auth/ResetPasswordPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import PrivacyPolicy from './components/PrivacyPolicy';
import CookiePolicy from './components/CookiePolicy';
import CookieBanner from './components/CookieBanner';
import TermsConditions from './components/TermsConditions';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <About />
            </>
          } />
          <Route path="/pasticceria" element={<Pasticceria />} />
          <Route path="/gelateria" element={<Gelateria />} />
          <Route path="/caffetteria" element={<Caffetteria />} />
          <Route path="/prenota-torta" element={<ProtectedRoute><CakeBooking /></ProtectedRoute>} />
          <Route path="/prenota-cornetti" element={<ProtectedRoute><CornettiBooking /></ProtectedRoute>} />
          <Route path="/prenota-prodotti" element={<ProtectedRoute><UnifiedBooking /></ProtectedRoute>} />
          <Route path="/prenota-mignon" element={<ProtectedRoute><MignonBooking /></ProtectedRoute>} />
          <Route path="/prenota-frollini" element={<ProtectedRoute><FrolliniBooking /></ProtectedRoute>} />
          <Route path="/prenota-pasticciotti" element={<ProtectedRoute><PasticciottBooking /></ProtectedRoute>} />
          <Route path="/prenota-paste-mandorla" element={<ProtectedRoute><PasteMandorlaBooking /></ProtectedRoute>} />
          <Route path="/prenota-vaschette-gelato" element={<ProtectedRoute><VaschettaGelatoBooking /></ProtectedRoute>} />
          <Route path="/prenota-torte-gelato" element={<ProtectedRoute><TorteGelatoBooking /></ProtectedRoute>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
        </Routes>
        <CookieBanner />
        <Footer />
      </div>
    </Router>

  );
}

export default App;