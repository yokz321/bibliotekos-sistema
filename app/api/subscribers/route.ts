export const dynamic = "force-dynamic"
import { mongooseConnect } from "@/lib/mongoose"
import { Subscriber } from "@/models/Subscriber"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    await mongooseConnect()
    const data = await Subscriber.find().sort({ createdAt: -1 })
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: "Klaida gaunant abonentus" },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    await mongooseConnect()
    const body = await req.json()
    const existing = await Subscriber.findOne({
      $or: [{ email: body.email }, { ticketNumber: body.ticketNumber }],
    })
    if (existing)
      return NextResponse.json(
        { error: "Abonentas su tokiais duomenimis jau yra!" },
        { status: 400 }
      )

    const newItem = await Subscriber.create(body)
    return NextResponse.json(newItem)
  } catch (error) {
    return NextResponse.json({ error: "Serverio klaida" }, { status: 500 })
  }
}
