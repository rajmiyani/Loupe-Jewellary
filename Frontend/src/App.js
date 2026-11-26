import { Route, Routes, useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import CustomerRouters from './customer/routers/CustomerRouters';
import AdminRouters from './customer/routers/AdminRouters';
import AdminGuard from './admin/components/AdminGuard';
import IsAdmin from './config/isAdmin';
import WhatsAppContact from './customer/components/navigation/WhatsAppContact';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from "./components/ScrollToTop";

const ROUTE_SEO_META = {
  '/': {
    title: 'Loupe Jewels | Exquisite Handcrafted Gold & Certified Diamond Jewellery',
    description: "Explore Loupe Jewels' luxury collection of handcrafted gold and certified diamond jewellery. Discover timeless rings, necklaces, bracelets, and earrings designed for life's precious moments.",
  },
  '/all-jewellery': {
    title: 'All Jewellery Collection | Loupe Jewels',
    description: 'Browse our complete collection of handcrafted 18K gold and certified lab-grown diamond rings, earrings, necklaces, and bracelets at Loupe Jewels.',
  },
  '/all-jewellery/category/rings': {
    title: 'Diamond Rings Collection | Loupe Jewels',
    description: 'Shop certified lab-grown diamond engagement rings, solitaire rings, eternity bands, and cocktail rings in 18K gold.',
  },
  '/all-jewellery/category/earrings': {
    title: 'Diamond Earrings Collection | Loupe Jewels',
    description: 'Discover diamond studs, hoop earrings, huggies, and drop earrings crafted in 18K gold at Loupe Jewels.',
  },
  '/all-jewellery/category/necklace': {
    title: 'Diamond Necklaces & Pendants | Loupe Jewels',
    description: 'Explore tennis necklaces, solitaire pendants, and diamond collar necklaces handcrafted in 18K gold.',
  },
  '/all-jewellery/category/bracelets': {
    title: 'Diamond Bracelets & Tennis Bracelets | Loupe Jewels',
    description: 'Shop certified diamond tennis bracelets and chain bracelets crafted in 18K yellow, rose, and white gold.',
  },
  '/about': {
    title: 'About Loupe Jewels | Handcrafted Fine Jewellery',
    description: 'Learn about Loupe Jewels, our craftsmanship, certified lab-grown diamonds, and bespoke jewellery atelier in Surat, India.',
  },
  '/contact': {
    title: 'Contact Concierge | Loupe Jewels',
    description: 'Get in touch with Loupe Jewels for bespoke jewellery inquiries, custom sizing, and concierge support.',
  },
  '/contact-info': {
    title: 'Contact Information | Loupe Jewels',
    description: 'Visit or contact Loupe Jewellery LLP in Surat, Gujarat for certified diamond and gold jewellery.',
    canonicalPath: '/contact',
  },
  '/privacy': {
    title: 'Privacy Policy | Loupe Jewels',
    description: 'Read the Privacy Policy for Loupe Jewels explaining how we protect your personal information.',
  },
  '/refund': {
    title: 'Refund & Return Policy | Loupe Jewels',
    description: 'Review the Refund and Return Policy for Loupe Jewels purchases.',
  },
  '/shipping': {
    title: 'Shipping Policy | Loupe Jewels',
    description: 'Learn about insured shipping and delivery timelines at Loupe Jewels.',
  },
  '/terms': {
    title: 'Terms of Service | Loupe Jewels',
    description: 'Read the Terms of Service governing orders and website use at Loupe Jewels.',
  },
};

function RouteSeo({ pathname }) {
  if (pathname.startsWith('/admin') || pathname.startsWith('/product/')) {
    return null;
  }
  const cleanPath = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
  const meta = ROUTE_SEO_META[cleanPath];
  const canonicalUrl = `https://loupejewels.com${meta?.canonicalPath || cleanPath}`;
  const title = meta?.title || 'Loupe Jewels | Exquisite Handcrafted Gold & Certified Diamond Jewellery';
  const description = meta?.description || ROUTE_SEO_META['/'].description;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Helmet>
  );
}

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
      <RouteSeo pathname={location.pathname} />
      <ScrollToTop />
      
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/admin/*" element={<AdminGuard><AdminRouters /></AdminGuard>} />
        <Route path="/*" element={<CustomerRouters />} />
      </Routes>
      {!isAdminRoute && <WhatsAppContact />}
    </div>
  );
}

export default App;
