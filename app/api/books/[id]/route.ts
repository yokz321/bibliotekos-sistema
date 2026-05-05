import { mongooseConnect } from "@/lib/mongoose"
import { Book } from "@/models/Book"
import { NextResponse } from "next/server"

// Next.js 15 reikalauja, kad params būtų Promise
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await mongooseConnect()
    const { id } = await params // Išpakuojame ID
    const body = await req.json()

    // Naudojame returnDocument: 'after', kad gautume jau pakeistus duomenis
    const updatedBook = await Book.findByIdAndUpdate(id, body, {
      returnDocument: "after",
    })

    return NextResponse.json(updatedBook)
  } catch (error) {
    return NextResponse.json(
      { error: "Klaida atnaujinant knygą" },
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
    await Book.findByIdAndDelete(id)
    return NextResponse.json({ message: "Knyga pašalinta" })
  } catch (error) {
    return NextResponse.json(
      { error: "Klaida šalinant knygą" },
      { status: 500 }
    )
  }
}
