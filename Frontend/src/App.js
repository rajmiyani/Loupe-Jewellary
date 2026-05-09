import { Route, Routes, useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';
import CustomerRouters from './customer/routers/CustomerRouters';
import AdminRouters from './customer/routers/AdminRouters';
import IsAdmin from './config/isAdmin';
import WhatsAppContact from './customer/components/navigation/WhatsAppContact';

function App() {
  // Initialize theme from localStorage once on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('theme');
      const shouldUseDark = saved ? saved === 'dark' : false;
      const root = document.documentElement;
      if (shouldUseDark) root.classList.add('dark');
      else root.classList.remove('dark');
    } catch {
      // ignore
    }
  }, []);
  const isAdmin = IsAdmin();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <Routes>
        <Route path='/*' element={<CustomerRouters />}></Route>
        {isAdmin && <Route path='/admin/*' element={<AdminRouters />} />}
      </Routes>
      {!isAdminRoute && <WhatsAppContact />}
    </div>
  );
}

export default App;
