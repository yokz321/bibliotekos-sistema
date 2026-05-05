import { Author } from "@/models/Author"
import { mongooseConnect } from "@/lib/mongoose"
import { NextResponse } from "next/server"

// Svarbu: params tipas turi būti Promise
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await mongooseConnect()

    // 1. Next.js 15 reikalauja šios eilutės:
    const resolvedParams = await params
    const id = resolvedParams.id

    const { name, biography } = await req.json()

    const updated = await Author.findByIdAndUpdate(
      id, // Naudojame išpakuotą ID
      { name, biography },
      { returnDocument: "after" } // Pataisyta pagal Mongoose rekomendaciją
    )

    return NextResponse.json(updated)
  } catch (error) {
    console.error("PUT klaida:", error)
    return NextResponse.json({ error: "Klaida atnaujinant" }, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await mongooseConnect()

    // 1. Ta pati išpakavimo taisyklė ir čia:
    const resolvedParams = await params
    const id = resolvedParams.id

    await Author.findByIdAndDelete(id)

    return NextResponse.json({ message: "Pašalinta" })
  } catch (error) {
    return NextResponse.json({ error: "Klaida šalinant" }, { status: 500 })
  }
}
