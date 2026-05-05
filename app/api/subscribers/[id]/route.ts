import { mongooseConnect } from "@/lib/mongoose"
import { Subscriber } from "@/models/subscriber"
import { NextResponse } from "next/server"

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await mongooseConnect()
    const { id } = await params
    const body = await req.json()
    const updated = await Subscriber.findByIdAndUpdate(id, body, {
      returnDocument: "after",
    })
    return NextResponse.json(updated)
  } catch (error) {
    return NextResponse.json({ error: "Klaida atnaujinant" }, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await mongooseConnect()
    const { id } = await params
    await Subscriber.findByIdAndDelete(id)
    return NextResponse.json({ message: "Pašalinta" })
  } catch (error) {
    return NextResponse.json({ error: "Klaida šalinant" }, { status: 500 })
  }
}
