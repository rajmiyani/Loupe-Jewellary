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

// --- AGENT-READINESS CONSTANTS & METADATA (RFC 8288, llms.txt, MCP SEP-1649) ---
const HOMEPAGE_MARKDOWN = `# Loupe Jewels | Exquisite Handcrafted Gold & Certified Diamond Jewellery

> Loupe Jewels (Loupe Jewellery LLP) is an Indian luxury fine jewellery house based in Surat, Gujarat. We handcraft ethical, certified lab-grown diamond and BIS hallmarked gold jewellery, featuring engagement rings, solitaire necklaces, tennis bracelets, earrings, and bespoke custom commissions.

---

## Brand & Verification
- **Legal Entity**: Loupe Jewellery LLP
- **Brand Name**: Loupe Jewels
- **Location**: Surat, Gujarat, India (Diamond Capital of India)
- **Certifications**: 100% BIS Hallmarked Gold (14K, 18K), IGI & GIA Lab-Grown Diamonds
- **Diamond Guarantee**: CVD & HPHT ethical laboratory grown diamonds, physically, chemically, and optically identical to mined diamonds.
- **Website**: https://loupejewels.com
- **Concierge Email**: loupejewelsllp@gmail.com
- **Concierge Phone**: +91 99091 09074
- **WhatsApp**: https://wa.me/919909109074
- **Address**: 12-17 Sardar Owners Association, Mini Bazar, Varachha, Surat, Gujarat, India - 395006
- **Business Hours**: Monday to Saturday, 10:00 AM - 7:00 PM IST

---

## Core Collections
1. **Diamond Rings**
   - URL: https://loupejewels.com/all-jewellery/category/rings
   - Styles: Classic 4-prong and 6-prong Solitaires, Eternity Bands, Halo Rings, Vintage Bands, Men's Bands
   - Metals: 14K & 18K Yellow Gold, Rose Gold, White Gold, Platinum
2. **Diamond Earrings**
   - URL: https://loupejewels.com/all-jewellery/category/earrings
   - Styles: Certified Solitaire Studs, Huggies, Daily Hoops, Drop & Chandelier Earrings
3. **Fine Necklaces & Pendants**
   - URL: https://loupejewels.com/all-jewellery/category/necklace
   - Styles: Solitaire Pendants, Station Necklaces, Tennis Chokers, Bridal Statement Sets
4. **Tennis Bracelets & Cuffs**
   - URL: https://loupejewels.com/all-jewellery/category/bracelets
   - Styles: Diamond Tennis Bracelets, Flexible Bangles, Minimalist Chain Bracelets
5. **Bespoke Custom Jewellery**
   - URL: https://loupejewels.com/customize
   - Services: 1-on-1 Design Consultation, 3D CAD Renderings, Custom Diamond Selection, Heirloom Remounting

---

## Key Pages & Information
- **Home**: https://loupejewels.com/
- **Complete Catalogue**: https://loupejewels.com/all-jewellery
- **About Us**: https://loupejewels.com/about
- **Contact Concierge**: https://loupejewels.com/contact
- **Contact Details**: https://loupejewels.com/contact-info
- **Terms of Service**: https://loupejewels.com/terms
- **Privacy Policy**: https://loupejewels.com/privacy
- **Refund & Return Policy**: https://loupejewels.com/refund
- **Insured Shipping Policy**: https://loupejewels.com/shipping
- **LLMs Guide**: https://loupejewels.com/llms.txt
- **MCP Server Card**: https://loupejewels.com/.well-known/mcp/server-card.json
- **Sitemap**: https://loupejewels.com/sitemap.xml
- **Robots Directives**: https://loupejewels.com/robots.txt

---

## Machine-Readable WebMCP In-Browser Tools
When interacting in-browser, the following tools are available via \`window.__webmcpTools\` and \`navigator.modelContext.registerTool()\`:
- \`searchJewellery({ query, category, maxPrice })\`
- \`getContactDetails()\`
- \`viewPolicies()\`

© 2025 Loupe Jewellery LLP. All rights reserved.
`;

const MCP_SERVER_CARD = {
    "$schema": "https://modelcontextprotocol.io/schemas/server-card/v1.json",
    "name": "loupe-jewels-mcp",
    "version": "1.0.0",
    "description": "Model Context Protocol (MCP) server card for Loupe Jewels. Provides AI agents with catalogue search, product specifications, store location, and concierge assistance.",
    "homepage": "https://loupejewels.com",
    "endpoint": "https://loupejewels.com/api/mcp",
    "transport": {
        "type": "http-sse",
        "url": "https://loupejewels.com/api/mcp"
    },
    "capabilities": {
        "tools": { "list": true, "call": true },
        "resources": { "list": true, "read": true }
    },
    "tools": [
        {
            "name": "search_jewellery",
            "description": "Search Loupe Jewels collection of certified diamond rings, earrings, necklaces, and bracelets by query, metal, and price.",
            "inputSchema": {
                "type": "object",
                "properties": {
                    "query": { "type": "string", "description": "Search keyword e.g. solitaire, tennis bracelet, studs" },
                    "category": { "type": "string", "enum": ["rings", "earrings", "necklace", "bracelets"] },
                    "maxPrice": { "type": "number", "description": "Maximum budget in INR" }
                }
            }
        },
        {
            "name": "get_product_details",
            "description": "Get detailed specifications, metal karatage, diamond certification, and pricing for a specific jewellery piece.",
            "inputSchema": {
                "type": "object",
                "properties": {
                    "productId": { "type": "string", "description": "MongoDB ObjectID of the product" }
                },
                "required": ["productId"]
            }
        },
        {
            "name": "get_business_info",
            "description": "Get Loupe Jewels verified business details, boutique address, telephone, email, and certifications.",
            "inputSchema": { "type": "object", "properties": {} }
        }
    ]
};

const validExactRoutes = new Set([
    '/',
    '/home',
    '/home1',
    '/login',
    '/register',
    '/about',
    '/contact',
    '/contact-info',
    '/privacy',
    '/refund',
    '/shipping',
    '/terms',
    '/cart',
    '/checkout',
    '/user-details',
    '/customize',
    '/all-jewellery',
    '/product-catalogue'
]);

function isValidFrontendRoute(pathname, distPath) {
    if (validExactRoutes.has(pathname)) return true;
    if (pathname.startsWith('/product/')) return true;
    if (pathname.startsWith('/category/')) return true;
    if (pathname.startsWith('/all-jewellery/')) return true;
    if (pathname.startsWith('/account/')) return true;
    if (pathname.startsWith('/payment/')) return true;

    // Multi-level category routing e.g. /jewellery/women/rings
    const parts = pathname.split('/').filter(Boolean);
    if (parts.length === 3) return true;

    // Check if the file exists directly in dist
    const cleanPath = pathname.replace(/^\/+/, '');
    if (cleanPath && distPath && fs.existsSync(path.join(distPath, cleanPath))) {
        return true;
    }
    return false;
}

if (frontendDistPath) {
    console.log(`[Static] Serving frontend build from: ${frontendDistPath}`);

    // 1. Robots.txt with Content-Signal & Sitemap
    app.get('/robots.txt', (req, res) => {
        res.type('text/plain; charset=utf-8');
        const robotsPath = path.join(frontendDistPath, 'robots.txt');
        if (fs.existsSync(robotsPath)) {
            return res.sendFile(robotsPath);
        }
        return res.send(
`# robots.txt for https://loupejewels.com
User-agent: *
Allow: /
Disallow: /admin
Disallow: /checkout
Disallow: /account

Content-Signal: search=yes, ai-train=no

Sitemap: https://loupejewels.com/sitemap.xml
`
        );
    });

    // 2. Sitemap.xml
    app.get('/sitemap.xml', (req, res) => {
        res.type('application/xml; charset=utf-8');
        const sitemapPath = path.join(frontendDistPath, 'sitemap.xml');
        if (fs.existsSync(sitemapPath)) {
            return res.sendFile(sitemapPath);
        }
        return res.status(404).send('<!-- sitemap.xml not found -->');
    });

    // 3. llms.txt & llms-full.txt
    app.get('/llms.txt', (req, res) => {
        res.type('text/plain; charset=utf-8');
        const llmsPath = path.join(frontendDistPath, 'llms.txt');
        if (fs.existsSync(llmsPath)) {
            return res.sendFile(llmsPath);
        }
        return res.send(HOMEPAGE_MARKDOWN);
    });

    app.get('/llms-full.txt', (req, res) => {
        res.type('text/plain; charset=utf-8');
        const llmsFullPath = path.join(frontendDistPath, 'llms-full.txt');
        if (fs.existsSync(llmsFullPath)) {
            return res.sendFile(llmsFullPath);
        }
        return res.send(HOMEPAGE_MARKDOWN);
    });

    // 4. MCP Server Card (SEP-1649)
    app.get(['/.well-known/mcp/server-card.json', '/.well-known/mcp-server.json'], (req, res) => {
        res.type('application/json; charset=utf-8');
        const cardPath = path.join(frontendDistPath, '.well-known/mcp/server-card.json');
        if (fs.existsSync(cardPath)) {
            return res.sendFile(cardPath);
        }
        return res.json(MCP_SERVER_CARD);
    });

    // 5. Agent Negotiation & RFC 8288 Link Headers (run before static so root requests negotiate properly)
    app.use((req, res, next) => {
        // Emit RFC 8288 Link header advertising agent resources
        if (req.path === '/' || !req.path.includes('.')) {
            res.setHeader(
                'Link',
                '</llms.txt>; rel="describedby"; type="text/plain", </>; rel="alternate"; type="text/markdown", </.well-known/mcp/server-card.json>; rel="service-desc"; type="application/json"'
            );
        }

        // Content Negotiation: Serve rich Markdown when an AI agent asks for it via Accept header
        if ((req.path === '/' || req.path === '/index.html') && req.headers.accept && req.headers.accept.includes('text/markdown')) {
            res.type('text/markdown; charset=utf-8');
            return res.send(HOMEPAGE_MARKDOWN);
        }

        next();
    });

    app.use(express.static(frontendDistPath));

    // Handle SPA client routing: send index.html for non-API GET requests with dynamic OG tags for products
    app.get("*", async (req, res) => {
        // If an API or Auth route wasn't matched, return 404 JSON instead of HTML
        if (req.path.startsWith('/api') || req.path.startsWith('/auth') || req.path.startsWith('/check-api')) {
            return res.status(404).json({ message: `API route ${req.method} ${req.originalUrl} not found` });
        }

        // Emit RFC 8288 Link header advertising agent resources
        res.setHeader(
            'Link',
            '</llms.txt>; rel="describedby"; type="text/plain", </>; rel="alternate"; type="text/markdown", </.well-known/mcp/server-card.json>; rel="service-desc"; type="application/json"'
        );

        // Content Negotiation: Serve rich Markdown when an AI agent asks for it via Accept header
        if (req.headers.accept && req.headers.accept.includes('text/markdown')) {
            res.type('text/markdown; charset=utf-8');
            return res.send(HOMEPAGE_MARKDOWN);
        }

        // Real 404 status for non-existent routes
        if (!isValidFrontendRoute(req.path, frontendDistPath)) {
            if (req.accepts('html')) {
                return res.status(404).sendFile(path.join(frontendDistPath, "index.html"));
            }
            return res.status(404).json({ error: "Not Found", message: `The requested URL ${req.originalUrl} does not exist.`, status: 404 });
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