import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error('Defina MONGODB_URI no arquivo .env');
}

// Evita múltiplas conexões no dev (hot reload)
declare global {
  // eslint-disable-next-line no-var
  var __MONGOOSE_CONN__: Promise<typeof mongoose> | undefined;
}

export async function connectDB() {
  if (!globalThis.__MONGOOSE_CONN__) {
    globalThis.__MONGOOSE_CONN__ = mongoose.connect(MONGODB_URI!, {
      dbName: 'next-notes',
    });
  }
  return globalThis.__MONGOOSE_CONN__;
}
