import mongoose from "mongoose"

const URI = process.env.MONGO_URI!
const DB_NAME = process.env.MONGO_DB

if (!URI) throw new Error("MONGO_URI nerasta .env faile!")

let cached = (global as any).mongoose
if (!cached) cached = (global as any).mongoose = { conn: null, promise: null }

export async function mongooseConnect() {
  if (cached.conn) return cached.conn
  if (!cached.promise) {
    cached.promise = mongoose.connect(URI, { dbName: DB_NAME }).then((m) => m)
  }
  cached.conn = await cached.promise
  return cached.conn
}
