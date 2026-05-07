import mongoose from "mongoose"

const URI = process.env.MONGO_URI!
const DB_NAME = process.env.MONGO_DB

if (!URI) throw new Error("MONGO_URI nerasta .env faile!")

interface MongooseCache {
  conn: typeof mongoose | undefined
  promise: Promise<typeof mongoose> | undefined
}

declare global {
  var mongoose: MongooseCache | undefined
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: undefined, promise: undefined }
}

export async function connectMongoose() {
  if (!cached) {
    cached = global.mongoose = { conn: undefined, promise: undefined }
  }

  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(URI, {
        dbName: DB_NAME,
        tls: true,
        tlsAllowInvalidCertificates: true,
      })
      .then((m) => m)
  }

  cached.conn = await cached.promise
  return cached.conn
}
