import mongoose from "mongoose"

export async function mongooseConnect() {
  // Jei jau prisijungę, grąžiname esamą prisijungimą
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise()
  } else {
    const uri = process.env.MONGO_URI
    const dbName = process.env.MONGO_DB // biblioteka

    if (!uri) {
      throw new Error("KLAIDA: MONGO_URI nerasta .env faile!")
    }

    return mongoose.connect(uri, {
      dbName: dbName,
    })
  }
}
