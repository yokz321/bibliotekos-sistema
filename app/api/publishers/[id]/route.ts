import { Publisher } from "@/models/publisher-model"
import { mongooseConnect } from "@/utils/mongoose-client"
import { NextResponse } from "next/server"

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await mongooseConnect()
    const { id } = await params
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
    const { id } = await params
    await Publisher.findByIdAndDelete(id)
    return NextResponse.json({ message: "Leidykla pašalinta" })
  } catch (error) {
    return NextResponse.json(
      { error: "Klaida šalinant leidyklą" },
      { status: 500 }
    )
  }
}
