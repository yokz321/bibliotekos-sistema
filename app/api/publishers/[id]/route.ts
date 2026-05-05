export const dynamic = "force-dynamic"
import { Publisher } from "@/models/Publisher"
import { mongooseConnect } from "@/lib/mongoose"
import { NextResponse } from "next/server"

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await mongooseConnect()
    const { id } = await params // Išpakuojame ID
    const { name, location } = await req.json()

    const updatedPublisher = await Publisher.findByIdAndUpdate(
      id,
      { name, location },
      { returnDocument: "after" }
    )

    return NextResponse.json(updatedPublisher)
  } catch (error) {
    return NextResponse.json(
      { error: "Klaida atnaujinant leidyklą" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await mongooseConnect()
    const { id } = await params // Išpakuojame ID
    await Publisher.findByIdAndDelete(id)
    return NextResponse.json({ message: "Leidykla pašalinta" })
  } catch (error) {
    return NextResponse.json(
      { error: "Klaida šalinant leidyklą" },
      { status: 500 }
    )
  }
}
