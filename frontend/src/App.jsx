import React, { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Verify from './pages/Verify/Verify';
import MyOrders from './pages/MyOrders/MyOrders';
import FullMenuPage from './pages/FullMenuPage/FullMenuPage';
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Admin from "./pages/Admin/Admin.jsx";
import AdminLogin from "./pages/AdminLogin/AdminLogin.jsx";
import RequireAdmin from "./components/RequireAdmin/RequireAdmin.jsx";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();

  // Check if current route is admin or admin-login
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <ScrollToTop />
      <div className='app'>
        {/* Show Navbar only if NOT on admin pages */}
        {!isAdminRoute && <Navbar setShowLogin={setShowLogin} />}

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/myorders' element={<MyOrders />} />
          <Route path="/menu" element={<FullMenuPage />} />
          <Route path="/admin-login" element={<AdminLogin />} />

          {/* PROTECTED ADMIN ROUTE */}
          <Route path="/admin/*" element={
            <RequireAdmin>
              <Admin />
            </RequireAdmin>
          } />

          <Route path="*" element={<div>❌ Page Not Found</div>} />
        </Routes>
      </div>

      {/* Show Footer only if NOT on admin pages */}
      {!isAdminRoute && <Footer />}
    </>
  );
};

export default App;
