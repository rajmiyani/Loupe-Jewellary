# Loupe Diamond & Jewellery 💎
### Enterprise-Grade Premium Luxury E-commerce Platform

A high-performance, editorial-style e-commerce platform custom-engineered for high-end boutique jewellery. Designed with a luxury-first visual approach, responsive architecture, secure payment systems, and an integrated administrative control suite.

---

## 🌟 Key Features

### 🛍️ Client & Customer Experience
*   **Curated Luxury Catalogue:** Elegant grid layouts highlighting detailed jewellery specifications, classifications, and high-fidelity images.
*   **BIS Hallmark & SGL Certification Integration:** Built-in badges and authenticity assurances for hallmarked gold and certified diamonds.
*   **Bespoke Concierge Flows:** Direct-to-WhatsApp order triggers and integrated **Live Video Call Consultation** scheduler.
*   **Advanced Product Filters:** Highly responsive filtering panel leveraging custom sliders and options (Filter by Price, Discount, Stone, Occasion).
*   **Premium Drawer Shopping Cart:** Sidebar slider cart layout displaying live item counters and pricing details.

### 🔐 Secure Identity Management
*   **Dual Auth System:** Industry-standard secure email/password credential registration alongside one-click **Google OAuth 2.0 integration**.
*   **Audience Token Security:** Backend token signature validation utilizing the Google Auth library.
*   **Audience Security Headers:** Implemented secure Cross-Origin policies for robust protection against scripting attacks.

### 💳 Transaction & Checkout Engine
*   **Baseline Checkout Stepper:** Linear multi-step progress layout: Delivery Address → Order Summary → Secure Payments.
*   **Smart Address Deduplication:** Intelligent backend matching prevents duplicate address record saves in database models.
*   **Payment Gateway Integration:** Integrated hooks for Razorpay payment processing.

### 📊 Enterprise Administrative Console
*   **Live Metrics Dashboard:** High-level metrics charts tracking recent customer volumes, revenues, and sales statistics.
*   **Interactive Analytics:** Recharts integration for visualizing Sales Categories and Monthly Volume distribution.
*   **Product Catalog Management:** Fully featured CRUD manager to upload, edit, delete, and manage product collections (including media integrations).
*   **Order Tracking Console:** Management interface to view, filter, track, and update shipping/delivery states.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend UI/UX** | React (v18.2.0), Material-UI (v5.3.0), TailwindCSS (v3.0.0), Framer Motion, Lucide Icons |
| **State Management** | Redux & Redux-Thunk (for async dispatcher flows) |
| **Backend Core** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose ODM |
| **Integrations** | Cloudinary (Image Hosting), Razorpay (Payment Gateways), Google Cloud IAM (OAuth) |

---

## 📁 System Architecture

```text
Loupe_Jewellery/
├── Backend/                 # Server-side Application
│   ├── src/
│   │   ├── config/          # Database & Cloudinary configurations
│   │   ├── controller/      # API Controllers (Auth, Cart, Product, Order, Admin)
│   │   ├── middleware/      # Access Control & Token Verification guards
│   │   ├── models/          # Mongoose Database Schemas
│   │   ├── routes/          # Express API Endpoints
│   │   └── server.js        # Server Entry point
│   ├── package.json
│   └── vercel.json          # Deployment configuration
├── Frontend/                # Client-side Application (React.js)
│   ├── public/              # Static Assets & Entry HTML
│   ├── src/
│   │   ├── admin/           # Admin Dashboard Pages & Components
│   │   ├── customer/        # Customer-facing Pages (Cart, Orders, Products, Checkout)
│   │   ├── state/           # Redux Slices, Action Dispatchers, and Store config
│   │   ├── utils/           # Helper scripts (Formatting, APIs)
│   │   ├── App.js           # Route Switcher
│   │   └── index.css        # Global CSS variables & UI rules
│   └── package.json
└── README.md
```

---

## ⚙️ Configuration & Environment Setup

To run the application in a production environment, configure the following `.env` configurations:

### 1. Backend Environment Config (`Backend/.env`)
Create a file named `.env` in the `Backend` directory:
```env
# Database Server URI
MONGO_URL="mongodb+srv://<username>:<password>@cluster.mongodb.net/loupe_jewels?retryWrites=true&w=majority"

# Google Auth Client ID (For Backend Token Validation)
GOOGLE_CLIENT_ID="your-google-oauth-client-id.apps.googleusercontent.com"

# Cloudinary Integration (Media Upload Manager)
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
CLOUDINARY_UPLOAD_PRESET="your-upload-preset"
```

### 2. Frontend Environment Config (`Frontend/.env`)
Create a file named `.env` in the `Frontend` directory:
```env
# Base API URL pointing to the Backend service
REACT_APP_API_BASE_URL=http://localhost:5455
API_BASE_URL=http://localhost:5455
```

---

## 🚀 Deployment & Installation

### Local Development Setup

1. **Install Backend Dependencies:**
   ```bash
   cd Backend
   npm install
   ```
2. **Start Backend Server:**
   ```bash
   npm start
   ```
   *The server runs on port `5455` by default.*

3. **Install Frontend Dependencies:**
   ```bash
   cd ../Frontend
   npm install
   ```
4. **Start Frontend Client:**
   ```bash
   npm start
   ```
   *The browser opens to `http://localhost:3000` automatically.*

### Production Compilation (Build)
To compile and optimize the client application for production:
```bash
cd Frontend
npm run build
```
The resulting minified files will be located in the `Frontend/build/` directory, ready to be hosted on any static hosting environment (Vercel, AWS S3, Netlify).

---

## 🎨 Professional Design System

We adhere to a luxurious design system engineered to inspire trust and sophistication:

### 1. Color Palette Tokens
-   **Brand Primary Background (`#a9cee5`):** Soft Pastel Sky Blue. Used on primary navigation headers, footers, and highlight containers.
-   **Brand Accent Blue (`#3c7399`):** Medium Slate Blue. Used for CTAs, buttons, inline links, active navigation underlines, and pricing highlights.
-   **Contrast Deep Navy (`#1e3545`):** Deep Slate Navy. Used for text and icons overlaid on `#a9cee5` elements to maintain a readable 5.5:1 contrast ratio.
-   **Gold Accent (`#D4AF37`):** Brand gold. Used for authenticity chips, certificates, reviews stars, and notice bars.
-   **App Background (`#f8fafc`):** Clean, premium off-white canvas.

### 2. Typography Rules
-   **Headings / Serif Titles:** `'Playfair Display', serif` — captures the classical luxury print layout standard.
-   **Body Elements:** `'Poppins', sans-serif` — geometric, highly legible, modern sans-serif.
-   **Technical Data / Prices:** `'Outfit', sans-serif` — specialized display sans for numeric clarity.

---

*Handcrafted for Loupe Jewellery Brand Connoisseurs*
