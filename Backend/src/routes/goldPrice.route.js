const express = require('express');
const https = require('https');
const router = express.Router();

// Helper: HTTPS GET with redirect support and browser-like headers
function fetchJson(url, redirectCount = 0) {
    return new Promise((resolve, reject) => {
        if (redirectCount > 5) return reject(new Error('Too many redirects'));

        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0 Safari/537.36',
                'Accept': 'application/json, */*',
            }
        };

        https.get(url, options, (res) => {
            if ((res.statusCode === 301 || res.statusCode === 302) && res.headers.location) {
                return fetchJson(res.headers.location, redirectCount + 1).then(resolve).catch(reject);
            }
            if (res.statusCode !== 200) {
                return reject(new Error(`HTTP ${res.statusCode} from upstream`));
            }
            let raw = '';
            res.on('data', chunk => (raw += chunk));
            res.on('end', () => {
                try { resolve(JSON.parse(raw)); }
                catch (e) { reject(new Error(`JSON parse error: ${raw.slice(0, 100)}`)); }
            });
        }).on('error', (e) => reject(new Error(`Network: ${e.message}`)));
    });
}

// GET /api/gold-price
// Uses Yahoo Finance (GC=F gold futures) — reliable, no API key, server-friendly
router.get('/', async (req, res) => {
    try {
        const [yahooData, fxData] = await Promise.all([
            fetchJson('https://query1.finance.yahoo.com/v8/finance/chart/GC%3DF?interval=1d&range=1d'),
            fetchJson('https://open.er-api.com/v6/latest/USD'),
        ]);

        const usdPerOz = yahooData?.chart?.result?.[0]?.meta?.regularMarketPrice;
        const usdToInr = fxData?.rates?.INR || 83.5;

        if (!usdPerOz || typeof usdPerOz !== 'number') {
            console.error('[GoldPrice] Unexpected Yahoo data:', JSON.stringify(yahooData).slice(0, 200));
            return res.status(502).json({ error: 'Could not read gold price from upstream' });
        }

        const TROY_OZ_TO_GRAMS = 31.1035;
        const pricePerGram24k = (usdPerOz * usdToInr) / TROY_OZ_TO_GRAMS;

        return res.status(200).json({
            usdPerOz: parseFloat(usdPerOz.toFixed(2)),
            usdToInr: parseFloat(usdToInr.toFixed(2)),
            pricePerGram24k: Math.round(pricePerGram24k),
            pricePerGram22k: Math.round(pricePerGram24k * 0.9167),
            pricePerGram18k: Math.round(pricePerGram24k * 0.75),
            fetchedAt: new Date().toISOString(),
        });
    } catch (err) {
        console.error('[GoldPrice] Error:', err.message);
        return res.status(500).json({ error: err.message });
    }
});

module.exports = router;
