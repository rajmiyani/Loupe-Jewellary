import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './state/store';
import { Helmet } from 'react-helmet'
import { ToastProvider, ToastEventBridge } from './customer/components/Toast/ToastProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Helmet>
            <title>Loupe Jewellery</title>
            <meta name='description' content='Discover a dazzling online jewelry shopping experience with Loupe 💎✨' />
            <meta name="keywords" content="Exquisite Jewelry, Online Store, Luxury Accessories, Secure Transactions, Immersive Design" />
        </Helmet>
        <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
            <Provider store={store}>
                <ToastProvider>
                    <ToastEventBridge />
                    <App />
                </ToastProvider>
            </Provider>
        </GoogleOAuthProvider>
    </BrowserRouter>
);
