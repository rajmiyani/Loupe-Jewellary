const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");

const rootDir = path.resolve(__dirname, '..');
dotenv.config({ path: path.resolve(rootDir, '.env') });
const nodeEnv = process.env.NODE_ENV || 'development';
const envSpecificFile = path.resolve(rootDir, `.env.${nodeEnv}`);
if (fs.existsSync(envSpecificFile)) {
    dotenv.config({ path: envSpecificFile, override: true });
}

const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
    next();
});


const mongoose = require('mongoose');

app.get('/check-api/', (req, res) => {
    const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
    const dbState = states[mongoose.connection.readyState] || 'unknown';
    return res.status(200).json({
        message: 'welcome to backend',
        status: true,
        database: dbState,
        env: process.env.NODE_ENV || 'development'
    });
});

const authRouters = require('./routes/auth.route.js');
app.use('/auth', authRouters);

const userRouters = require('./routes/user.route.js');
app.use('/api/users', userRouters);

const productRouter = require('./routes/product.route.js');
app.use('/api/products', productRouter);

const categoryRouter = require('./routes/category.route.js');
app.use('/api/categories', categoryRouter);
app.use('/api/admin/categories', categoryRouter);

const adminProductRouter = require('./routes/adminProduct.route.js');
app.use('/api/admin/products', adminProductRouter);

const cartRouter = require('./routes/cart.route.js');
app.use('/api/cart', cartRouter);

const cartItemRouter = require('./routes/cartItem.route.js');
app.use('/api/cart_item', cartItemRouter);

const wishRouter = require('./routes/wish.route.js');
app.use('/api/wish', wishRouter);

const orderRouter = require('./routes/order.route.js');
app.use('/api/orders', orderRouter);

const adminOrderRouter = require('./routes/adminOrder.route.js');
app.use('/api/admin/orders', adminOrderRouter);

const reviewRouter = require('./routes/review.route.js');
app.use('/api/reviews', reviewRouter);

const ratingRouter = require('./routes/rating.route.js');
app.use("/api/ratings", ratingRouter);

const paymentRouter = require('./routes/payment.routes.js');
app.use("/api/payment", paymentRouter);

const adminDashboardRouter = require('./routes/admindashboard.route.js');
app.use("/api/admin/dashboard", adminDashboardRouter);

// Cloudinary upload (images + videos via backend, authenticated)
const uploadRouter = require('./routes/upload.route.js');
app.use('/api/upload', uploadRouter);

// Sparkle Videos (Find Your Perfect Sparkle section)
const sparkleVideoRouter = require('./routes/sparkleVideo.route.js');
app.use('/api/sparkle-videos', sparkleVideoRouter);

// Gold Price Proxy (avoids CORS from browser)
const goldPriceRouter = require('./routes/goldPrice.route.js');
app.use('/api/gold-price', goldPriceRouter);

// Serve frontend static build if present (production / Hostinger unified deployment)
const Product = require('./models/product.model.js');

function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function resolveProductImage(prod) {
    if (Array.isArray(prod.imageUrls) && prod.imageUrls.length > 0) {
        const first = prod.imageUrls[0];
        const url = typeof first === 'string' ? first : first?.imageUrl;
        if (url && typeof url === 'string' && url.trim()) {
            const cleanUrl = url.trim();
            if (cleanUrl.startsWith('http')) return cleanUrl;
            return `https://loupejewels.com${cleanUrl.startsWith('/') ? cleanUrl : `/${cleanUrl}`}`;
        }
    }
    if (prod.imageUrl && typeof prod.imageUrl === 'string') {
        const cleanUrl = prod.imageUrl.trim();
        if (cleanUrl.startsWith('http')) return cleanUrl;
        return `https://loupejewels.com${cleanUrl.startsWith('/') ? cleanUrl : `/${cleanUrl}`}`;
    }
    return 'https://loupejewels.com/og-image.jpg';
}

function cleanDescription(desc, fallback) {
    if (!desc || typeof desc !== 'string') return fallback;
    const clean = desc.replace(/<[^>]*>?/gm, '').replace(/\s+/g, ' ').trim();
    if (clean.length > 155) {
        return clean.substring(0, 152) + '...';
    }
    return clean || fallback;
}

const possibleDistPaths = [
    path.join(__dirname, "../dist"),             // server/dist
    path.join(process.cwd(), "dist"),            // dist in current working directory
    path.join(__dirname, "dist"),                // server/src/dist
    path.join(__dirname, "../../Frontend/dist")  // Frontend/dist in local monorepo
];
const frontendDistPath = possibleDistPaths.find(p => fs.existsSync(p) && fs.existsSync(path.join(p, "index.html")));

if (frontendDistPath) {
    console.log(`[Static] Serving frontend build from: ${frontendDistPath}`);
    app.use(express.static(frontendDistPath));

    // Handle SPA client routing: send index.html for non-API GET requests with dynamic OG tags for products
    app.get("*", async (req, res) => {
        // If an API or Auth route wasn't matched, return 404 JSON instead of HTML
        if (req.path.startsWith('/api') || req.path.startsWith('/auth') || req.path.startsWith('/check-api')) {
            return res.status(404).json({ message: `API route ${req.method} ${req.originalUrl} not found` });
        }

        // If it's a product page request, inject dynamic product Open Graph metadata for crawlers & previews
        if (req.path.startsWith('/product/')) {
            try {
                const parts = req.path.split('/product/')[1]?.split('/');
                const productId = parts?.[0]?.split('?')[0];

                if (productId && mongoose.Types.ObjectId.isValid(productId)) {
                    const product = await Product.findById(productId).lean();
                    if (product) {
                        const indexHtmlPath = path.join(frontendDistPath, "index.html");
                        let html = fs.readFileSync(indexHtmlPath, "utf8");

                        const productTitle = escapeHtml(product.title) + " | Loupe Jewels";
                        const rawDesc = product.description || product.details || "";
                        const productDesc = escapeHtml(cleanDescription(rawDesc, "Explore exquisite handcrafted gold and diamond jewellery at Loupe Jewels."));
                        const productUrl = `https://loupejewels.com/product/${product._id}`;
                        const productImage = escapeHtml(resolveProductImage(product));

                        // Replace Title & Description
                        html = html.replace(/<title>.*?<\/title>/gi, `<title>${productTitle}</title>`);
                        html = html.replace(/<meta\s+name=["']description["']\s+content=["'].*?["']\s*\/?>/gi, `<meta name="description" content="${productDesc}" />`);
                        html = html.replace(/<link\s+rel=["']canonical["']\s+href=["'].*?["']\s*\/?>/gi, `<link rel="canonical" href="${productUrl}" />`);

                        // Replace Open Graph meta tags
                        html = html.replace(/<meta\s+property=["']og:title["']\s+content=["'].*?["']\s*\/?>/gi, `<meta property="og:title" content="${productTitle}" />`);
                        html = html.replace(/<meta\s+property=["']og:description["']\s+content=["'].*?["']\s*\/?>/gi, `<meta property="og:description" content="${productDesc}" />`);
                        html = html.replace(/<meta\s+property=["']og:url["']\s+content=["'].*?["']\s*\/?>/gi, `<meta property="og:url" content="${productUrl}" />`);
                        html = html.replace(/<meta\s+property=["']og:type["']\s+content=["'].*?["']\s*\/?>/gi, `<meta property="og:type" content="product" />`);
                        html = html.replace(/<meta\s+property=["']og:image["']\s+content=["'].*?["']\s*\/?>/gi, `<meta property="og:image" content="${productImage}" />`);
                        html = html.replace(/<meta\s+property=["']og:image:secure_url["']\s+content=["'].*?["']\s*\/?>/gi, `<meta property="og:image:secure_url" content="${productImage}" />`);

                        // Replace Twitter Card meta tags
                        html = html.replace(/<meta\s+name=["']twitter:title["']\s+content=["'].*?["']\s*\/?>/gi, `<meta name="twitter:title" content="${productTitle}" />`);
                        html = html.replace(/<meta\s+name=["']twitter:description["']\s+content=["'].*?["']\s*\/?>/gi, `<meta name="twitter:description" content="${productDesc}" />`);
                        html = html.replace(/<meta\s+name=["']twitter:url["']\s+content=["'].*?["']\s*\/?>/gi, `<meta name="twitter:url" content="${productUrl}" />`);
                        html = html.replace(/<meta\s+name=["']twitter:image["']\s+content=["'].*?["']\s*\/?>/gi, `<meta name="twitter:image" content="${productImage}" />`);

                        return res.send(html);
                    }
                }
            } catch (err) {
                console.error("[OG] Error injecting product meta tags:", err?.message || err);
            }
        }

        res.sendFile(path.join(frontendDistPath, "index.html"));
    });
} else {
    // If frontend build not found, provide informative message on root
    app.get("/", (req, res) => {
        res.status(200).json({
            status: true,
            message: "Loupe Backend API is running.",
            hint: "To serve the frontend from this server, build the Frontend and paste the dist folder into server/dist"
        });
    });
}

// Central error handler
app.use((err, req, res, next) => {
    console.error(err.stack || err);
    const isProd = process.env.NODE_ENV === 'production';
    res.status(err.status || 500).json({
        message: isProd ? 'Internal Server Error' : (err.message || 'Internal Server Error'),
        ...(isProd ? {} : { stack: err.stack })
    });
});

module.exports = app;