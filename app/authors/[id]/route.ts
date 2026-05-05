export const dynamic = "force-dynamic"
import { Author } from "@/models/Author"
import { mongooseConnect } from "@/lib/mongoose"
import { NextResponse } from "next/server"

// Svarbu: params dabar yra Promise, todėl nurodome tipą teisingai
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await mongooseConnect()
    const { id } = await params // BŪTINA: išpakuojame ID su await
    const { name, biography } = await req.json()

    const updatedAuthor = await Author.findByIdAndUpdate(
      id,
      { name, biography },
      { returnDocument: "after" } // Naujas Mongoose standartas
    )

    return NextResponse.json(updatedAuthor)
  } catch (error) {
    return NextResponse.json(
      { error: "Klaida atnaujinant autorių" },
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
    const { id } = await params // BŪTINA: išpakuojame ID
    await Author.findByIdAndDelete(id)
    return NextResponse.json({ message: "Autorius pašalintas" })
  } catch (error) {
    return NextResponse.json(
      { error: "Klaida šalinant autorių" },
      { status: 500 }
    )
  }
}
