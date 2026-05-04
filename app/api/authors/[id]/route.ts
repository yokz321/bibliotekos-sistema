import { Author } from "@/models/Author"
import { mongooseConnect } from "@/lib/mongoose"
import { NextResponse } from "next/server"

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await mongooseConnect()
  const { name, biography } = await req.json()
  const updated = await Author.findByIdAndUpdate(
    params.id,
    { name, biography },
    { new: true }
  )
  return NextResponse.json(updated)
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await mongooseConnect()
  await Author.findByIdAndDelete(params.id)
  return NextResponse.json({ message: "Pašalinta" })
}
