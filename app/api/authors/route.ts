import { Author } from "@/models/Author"
import { mongooseConnect } from "@/lib/mongoose"
import { NextResponse } from "next/server"

// Gauti visus autorius
export async function GET() {
  try {
    // 1. Prisijungiame prie DB
    await mongooseConnect()

    // 2. Ieškome autorių ir rūšiuojame pagal naujausius
    const authors = await Author.find().sort({ createdAt: -1 })

    // 3. Grąžiname duomenis JSON formatu
    return NextResponse.json(authors)
  } catch (error: any) {
    // Jei įvyko klaida (pvz. DB IP whitelist problema), ją matysi VS Code terminale
    console.error("GET authors klaida:", error.message)

    // Grąžiname JSON klaidą, kad frontend'as nelūžtų
    return NextResponse.json(
      { error: "Nepavyko gauti autorių sąrašo iš duomenų bazės" },
      { status: 500 }
    )
  }
}

// Pridėti naują autorių
export async function POST(req: Request) {
  try {
    await mongooseConnect()

    // Saugiai nuskaitome JSON duomenis
    const body = await req.json()
    const { name, biography } = body

    if (!name) {
      return NextResponse.json(
        { error: "Vardas yra privalomas" },
        { status: 400 }
      )
    }

    // Tikriname dublikatus (Regex užtikrina, kad "Jonas" ir "jonas" būtų tas pats)
    const existing = await Author.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") },
    })

    if (existing) {
      return NextResponse.json(
        { error: "Toks autorius jau egzistuoja sistemoje!" },
        { status: 400 }
      )
    }

    // Sukuriame naują įrašą
    const newAuthor = await Author.create({ name, biography })
    return NextResponse.json(newAuthor)
  } catch (error: any) {
    console.error("POST authors klaida:", error.message)
    return NextResponse.json(
      { error: "Serverio klaida pridedant autorių" },
      { status: 500 }
    )
  }
}
