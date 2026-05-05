import { Publisher } from "@/models/Publisher"
import { mongooseConnect } from "@/lib/mongoose"
import { NextResponse } from "next/server"

export async function GET() {
  await mongooseConnect()
  const publishers = await Publisher.find().sort({ createdAt: -1 })
  return NextResponse.json(publishers)
}

export async function POST(req: Request) {
  try {
    await mongooseConnect()
    const { name, location } = await req.json()

    // Dubliavimo patikra
    const existing = await Publisher.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") },
    })

    if (existing) {
      return NextResponse.json(
        { error: "Tokia leidykla jau egzistuoja!" },
        { status: 400 }
      )
    }

    const newPublisher = await Publisher.create({ name, location })
    return NextResponse.json(newPublisher)
  } catch (error) {
    return NextResponse.json({ error: "Serverio klaida" }, { status: 500 })
  }
}
