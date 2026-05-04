import { Author } from "@/models/Author"
import { mongooseConnect } from "@/lib/mongoose"
import { NextResponse } from "next/server"

export async function GET() {
  await mongooseConnect()
  const authors = await Author.find().sort({ createdAt: -1 })
  return NextResponse.json(authors)
}

export async function POST(req: Request) {
  try {
    await mongooseConnect()
    const { name, biography } = await req.json()

    const existing = await Author.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") },
    })
    if (existing) {
      return NextResponse.json(
        { error: "Toks autorius jau egzistuoja sistemoje!" },
        { status: 400 }
      )
    }

    const newAuthor = await Author.create({ name, biography })
    return NextResponse.json(newAuthor)
  } catch (error) {
    return NextResponse.json({ error: "Serverio klaida" }, { status: 500 })
  }
}
