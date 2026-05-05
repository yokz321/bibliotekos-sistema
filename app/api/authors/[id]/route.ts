import { Author } from "@/models/author"
import { mongooseConnect } from "@/lib/mongoose"
import { NextResponse } from "next/server"

// Next.js 15 reikalauja, kad params būtų Promise
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await mongooseConnect()

    // BŪTINA išpakuoti params su await
    const { id } = await params

    const { name, biography } = await req.json()

    const updated = await Author.findByIdAndUpdate(
      id,
      { name, biography },
      { returnDocument: "after" }
    )

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

    // Ta pati taisyklė: išpakuojame params
    const { id } = await params

    await Author.findByIdAndDelete(id)

    return NextResponse.json({ message: "Pašalinta" })
  } catch (error) {
    return NextResponse.json({ error: "Klaida šalinant" }, { status: 500 })
  }
}
