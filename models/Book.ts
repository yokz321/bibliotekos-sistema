import mongoose, { Schema, model, models } from "mongoose"

const BookSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Knygos pavadinimas privalomas"],
      trim: true,
    },
    // Ryšys su Autoriaus modeliu
    author: {
      type: Schema.Types.ObjectId,
      ref: "Author", // Turi sutapti su pavadinimu models/Author.ts faile
      required: [true, "Autorius yra privalomas"],
    },
    // Ryšys su Leidyklos modeliu
    publisher: {
      type: Schema.Types.ObjectId,
      ref: "Publisher", // Turi sutapti su pavadinimu models/Publisher.ts faile
      required: [true, "Leidykla yra privaloma"],
    },
    year: {
      type: Number,
      required: [true, "Leidybos metai privalomi"],
    },
    isbn: {
      type: String,
      unique: true,
      sparse: true, // Leidžia turėti tuščius ISBN, bet jei įvestas - turi būti unikalus
    },
    summary: {
      type: String,
    },
    pages: {
      type: Number,
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true, // Automatiškai pridės createdAt ir updatedAt laukus
  }
)

// Eksportuojame modelį. Jei jis jau egzistuoja (models.Book), naudojame esamą.
export const Book = models.Book || model("Book", BookSchema)
