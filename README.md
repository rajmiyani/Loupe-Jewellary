# Loupe Jeweler - E-Commerce Platform

This is the central repository for the **Loupe Jeweler** (formerly Gayatri) application, encompassing both the customer-facing e-commerce storefront and the executive-tier admin dashboard.

## 📂 Project Structure

```text
E:\Loupe_Jewellery
├── Backend/                 # Back-end API Server (Node.js/Express)
│   ├── .env                 # Environment variables for backend
│   ├── src/                 
│   │   ├── config/          # Database configuration and connection handling
│   │   ├── controllers/     # API route controllers
│   │   ├── models/          # Mongoose database models (Products, Orders, Users, etc.)
│   │   ├── routes/          # Express route definitions
│   │   ├── scripts/         # Backup and seeder scripts
│   │   └── server.js        # Main Express application entry point
│   ├── delete_old_products.js # Database cleanup utility script
│   └── package.json         # Backend dependencies
│
├── Frontend/                # Front-end React Application
│   ├── public/              # Static assets (favicons, manifest.json)
│   ├── src/
│   │   ├── admin/           # Executive Admin Dashboard
│   │   │   ├── components/  # Admin-specific components (OrdersTable, ProductsTable, etc.)
│   │   │   ├── tables/      # Material UI DataGrid tables
│   │   │   └── view/        # Top-level Admin views and layouts
│   │   ├── customer/        # Customer-Facing Storefront
│   │   │   ├── auth/        # Login/Registration Modals
│   │   │   ├── components/  # User interfaces (Navigation, Footer, Forms)
│   │   │   └── pages/       # Public routing pages (Home, Cart, Product View)
│   │   ├── context/         # React Context Providers (e.g. ModalContext)
│   │   ├── state/           # Redux state management (actions/reducers)
│   │   └── App.js           # Core React router routing logic
│   └── package.json         # Frontend dependencies and scripts
│
├── package-lock.json        # Unified Dependency lock file
└── .gitignore               # Ignored files for version control
```

## 🛠 Features

### Customer Front-end
- Categorized browsing for multiple luxury jewelry types (Gold, Diamond, Platinum, Silver, etc.).
- Wishlist, Shopping Cart, and integrated Checkout.
- Theme switching functionality built with modern aesthetics.

### Executive Admin Dashboard
- **Product Inventory Management:** Complete CRUD capabilities, rich image uploading via Cloudinary, dynamically adjusting forms for different product properties.
- **Order Processing:** State-managed validation for updating order statuses (`PLACED` -> `SHIPPED` -> `DELIVERED`). Protection against reverting dispatched orders.
- **Customer Management:** Comprehensive administrative tools tailored specifically for maintaining the Loupe Jeweler platform interface.

## 🚀 Getting Started

To run the application locally:

1. **Backend Initialization**
   - Navigate to `/Backend` and run `npm install`.
   - Ensure an active `.env` configuration file exists.
   - Boot up via `npm start` or `node src/server.js`.

2. **Frontend Initialization**
   - Navigate to `/Frontend` and run `npm install`.
   - Boot up via `npm start` to run the development server.

---
*Maintained and documented for Loupe Jeweler.*
