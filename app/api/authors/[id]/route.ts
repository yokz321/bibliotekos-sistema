import { Author } from "@/models/Author"
import { mongooseConnect } from "@/lib/mongoose"
import { NextResponse } from "next/server"

// 1. Next.js 15 reikalauja, kad params būtų Promise
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await mongooseConnect()

    // 2. BŪTINA išpakuoti params su await
    const { id } = await params

    const { name, biography } = await req.json()

    const updated = await Author.findByIdAndUpdate(
      id, // Naudojame išpakuotą id
      { name, biography },
      { returnDocument: "after" } // Naujas standartas vietoj { new: true }
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

    // 3. Ta pati taisyklė: išpakuojame params
    const { id } = await params

    await Author.findByIdAndDelete(id)

    return NextResponse.json({ message: "Pašalinta" })
  } catch (error) {
    return NextResponse.json({ error: "Klaida šalinant" }, { status: 500 })
  }
}
