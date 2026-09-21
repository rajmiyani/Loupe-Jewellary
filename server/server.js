const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

// Load base .env
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Load environment-specific .env (e.g. .env.production or .env.development) if present
const nodeEnv = process.env.NODE_ENV || 'development';
const envSpecificFile = path.resolve(__dirname, `.env.${nodeEnv}`);
if (fs.existsSync(envSpecificFile)) {
  dotenv.config({ path: envSpecificFile, override: true });
}

const app = require('./src');
const { connectDB } = require('./src/config/db');
const { ensureAdminUserExists } = require('./src/seed/ensureAdmin');
const { ensureDefaultCategoriesExist } = require('./src/seed/ensureCategories');
const PORT = Number(process.env.PORT) || 5455;

const startServer = (port) => {
  const server = app.listen(port, async () => {
    await connectDB();
    try {
      await ensureAdminUserExists();
      await ensureDefaultCategoriesExist();
    } catch (err) {
      console.error("Failed to run startup seeds:", err?.message || err);
    }
    console.log(`[Server] Running in ${(process.env.NODE_ENV || 'development').toUpperCase()} mode on PORT: ${port}`);
  });

  server.on('error', (err) => {
    if (err && err.code === 'EADDRINUSE') {
      const fallbackPort = port + 1;
      console.warn(`Port ${port} in use. Trying ${fallbackPort}...`);
      startServer(fallbackPort);
    } else {
      console.error('Server failed to start:', err);
      process.exit(1);
    }
  });
  return server;
};

startServer(PORT);

module.exports = app;

