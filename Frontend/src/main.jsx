import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './state/store';
import { Helmet } from 'react-helmet';
import { ToastProvider, ToastEventBridge } from './customer/components/Toast/ToastProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Helmet>
            <title>Loupe Jewels | Exquisite Handcrafted Gold &amp; Diamond Jewellery</title>
            <meta name='description' content="Explore Loupe Jewels' luxury collection of handcrafted gold and certified diamond jewellery. Discover timeless rings, necklaces, bracelets, and earrings designed for life's precious moments." />
            <meta name="keywords" content="Loupe Jewels, buy gold jewellery online, diamond rings online, premium jewellery India, bespoke jewellery designs, diamond necklaces, luxury bracelets, engagement rings, BIS hallmarked gold, lab certified diamonds, custom jewellery design, 18k gold jewellery" />
            <link rel="canonical" href="https://loupejewels.com/" />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="Loupe Jewels" />
            <meta property="og:url" content="https://loupejewels.com/" />
            <meta property="og:title" content="Loupe Jewels | Exquisite Handcrafted Gold &amp; Diamond Jewellery" />
            <meta property="og:description" content="Explore Loupe Jewels' luxury collection of handcrafted gold and certified diamond jewellery. Discover timeless rings, necklaces, bracelets, and earrings designed for life's precious moments." />
            <meta property="og:image" content="https://loupejewels.com/og-image.jpg" />
            <meta property="og:image:secure_url" content="https://loupejewels.com/og-image.jpg" />
            <meta property="og:image:type" content="image/jpeg" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Loupe Jewels | Exquisite Handcrafted Gold &amp; Diamond Jewellery" />
            <meta name="twitter:description" content="Explore Loupe Jewels' luxury collection of handcrafted gold and certified diamond jewellery. Discover timeless rings, necklaces, bracelets, and earrings designed for life's precious moments." />
            <meta name="twitter:image" content="https://loupejewels.com/og-image.jpg" />
        </Helmet>
        <GoogleOAuthProvider clientId="697454810183-ob2h3lgvbd3knup1thqssb9hj99eg11n.apps.googleusercontent.com">
            <Provider store={store}>
                <ToastProvider>
                    <ToastEventBridge />
                    <App />
                </ToastProvider>
            </Provider>
        </GoogleOAuthProvider>
    </BrowserRouter>
);
