# Loupe Diamond & Jewellery 💎

A premium, editorial-style e-commerce platform for high-end jewellery, featuring a minimal aesthetic, fluid animations, and a seamless shopping experience.

---

## ✨ Features

### 🔐 Secure Authentication
- **Dual-Mode Auth:** Standard Email/Password registration and login.
- **Google OAuth 2.0:** Secure, one-click login with synchronized profile data.
- **Robust Security:** Cross-Origin-Opener-Policy (COOP) and audience-validated token verification.

### 🛍️ Editorial Shopping Experience
- **Premium Catalogue:** High-end boutique layout with sophisticated typography (Playfair Display).
- **Advanced Filters:** Intuitive MUI Accordions and color swatches for effortless discovery.
- **Live Search:** Fast, responsive product search with overlay UI.

### 🛒 Synchronized Checkout
- **Smart Navigation:** Perfectly aligned step-by-step checkout flow (Delivery → Summary → Payment).
- **Address Deduplication:** Intelligent backend matching prevents duplicate address saving, keeping user profiles clean.
- **Data Guards:** Robust loading states and error handling prevent "undefined" crashes during data fetching.

### 📦 Order Management
- **Visual Tracking:** Professional Order Tracker with status transitions.
- **History Grouping:** Clean, date-based grouping of previous orders for a historical record.
- **Rating & Reviews:** Integrated feedback system for products.

---

## 🛠️ Tech Stack

**Frontend:**
- React.js with Redux Toolkit (State Management)
- Material UI (Components & Theming)
- Lucide React (Icons)
- Framer Motion (Animations)
- Axios (API Communication)

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose (Database)
- Google Auth Library (Token Validation)
- Razorpay Integration (Payment Processing)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas or Local Instance
- Google Cloud Console Project (for OAuth)

### Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/rajmiyani/Loupe-Jewellary.git
   cd Loupe-Jewellary
   ```

2. **Backend Setup:**
   ```bash
   cd Backend
   npm install
   # Create a .env file with your MONGO_URL and GOOGLE_CLIENT_ID
   npm start
   ```

3. **Frontend Setup:**
   ```bash
   cd ../Frontend
   npm install
   npm start
   ```

---

## 🎨 Design Philosophy

Loupe Diamond & Jewellery is designed with a **"High-End editorial"** approach. We prioritize whitespace, high-fidelity imagery, and subtle micro-animations to create a sense of luxury and trust.

- **Typography:** Playfair Display for headings, Inter for body text.
- **Color Palette:** Deep Slate (#1e293b), Soft Blue (#97c2d5), and Clean White.

---

*Handcrafted by Loupe Team*
