import { mongooseConnect } from "@/utils/mongoose-client"
import { Book } from "@/models/book-model"
import { Author } from "@/models/author-model"
import { Publisher } from "@/models/publisher-model"
import { NextResponse } from "next/server"

// 1. GAUTI VISAS KNYGAS
export async function GET() {
  try {
    await mongooseConnect()
    const books = await Book.find()
      .populate("author")
      .populate("publisher")
      .sort({ createdAt: -1 })

    return NextResponse.json(books)
  } catch (error: any) {
    console.error("KLAIDA gaunant knygas:", error.message)
    return NextResponse.json(
      { error: "Nepavyko gauti knygų sąrašo" },
      { status: 500 }
    )
  }
}

// 2. PRIDĖTI NAUJĄ KNYGĄ
export async function POST(req: Request) {
  try {
    await mongooseConnect()
    const body = await req.json()

    const { title, author, publisher, year, isbn, summary, pages, quantity } =
      body

    if (!title || !author || !publisher || !year) {
      return NextResponse.json(
        {
          error:
            "Užpildykite visus privalomus laukus (Pavadinimas, Autorius, Leidykla, Metai)",
        },
        { status: 400 }
      )
    }

    // Patikriname, ar knyga su tokiu ISBN jau egzistuoja (jei ISBN nurodytas)
    if (isbn) {
      const existingBook = await Book.findOne({ isbn })
      if (existingBook) {
        return NextResponse.json(
          { error: "Knyga su šiuo ISBN kodu jau yra sistemoje!" },
          { status: 400 }
        )
      }
    }

    // Sukuriame knygą
    const newBook = await Book.create({
      title,
      author,
      publisher,
      year,
      isbn,
      summary,
      pages,
      quantity,
    })

    // Grąžiname naują knygą (galima dar kartą užpopulinti, jei reikia iškart rodyti UI)
    const populatedBook = await Book.findById(newBook._id)
      .populate("author")
      .populate("publisher")

    return NextResponse.json(populatedBook)
  } catch (error: any) {
    console.error("KLAIDA pridedant knygą:", error.message)
    return NextResponse.json(
      { error: "Serverio klaida išsaugant knygą" },
      { status: 500 }
    )
  }
}
