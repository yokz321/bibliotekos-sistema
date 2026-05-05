import { mongooseConnect } from "@/lib/mongoose"
import { Book } from "@/models/Book"
import { NextResponse } from "next/server"

// REDAGUOTI KNYGĄ
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await mongooseConnect()
    const body = await req.json()
    const updatedBook = await Book.findByIdAndUpdate(params.id, body, {
      new: true,
    })
    return NextResponse.json(updatedBook)
  } catch (error) {
    return NextResponse.json(
      { error: "Klaida atnaujinant knygą" },
      { status: 500 }
    )
  }
}

// ŠALINTI KNYGĄ
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await mongooseConnect()
    await Book.findByIdAndDelete(params.id)
    return NextResponse.json({ message: "Knyga pašalinta" })
  } catch (error) {
    return NextResponse.json(
      { error: "Klaida šalinant knygą" },
      { status: 500 }
    )
  }
}
