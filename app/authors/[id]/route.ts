import { Author } from "@/models/author"
import { mongooseConnect } from "@/lib/mongoose"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await mongooseConnect()

    // Išpakuojame params (Next.js 15 reikalavimas)
    const resolvedParams = await params
    const id = resolvedParams.id

    console.log("--- Bandoma atnaujinti autorių, ID:", id)

    const { name, biography } = await req.json()

    const updated = await Author.findByIdAndUpdate(
      id,
      { name, biography },
      { returnDocument: "after" }
    )

    if (!updated) {
      return NextResponse.json({ error: "Autorius nerastas" }, { status: 404 })
    }

    return NextResponse.json(updated)
  } catch (error: any) {
    console.error("API PUT KLAIDA:", error.message)
    return NextResponse.json({ error: "Serverio klaida" }, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await mongooseConnect()
    const { id } = await params

    console.log("--- Bandoma trinti autorių, ID:", id)

    await Author.findByIdAndDelete(id)
    return NextResponse.json({ message: "Sėkmingai pašalinta" })
  } catch (error: any) {
    console.error("API DELETE KLAIDA:", error.message)
    return NextResponse.json({ error: "Nepavyko pašalinti" }, { status: 500 })
  }
}
