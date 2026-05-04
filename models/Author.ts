import mongoose, { Schema, model, models } from "mongoose"

const AuthorSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Vardas privalomas"],
      unique: true,
      trim: true,
    },
    biography: { type: String },
  },
  { timestamps: true }
)

export const Author = models.Author || model("Author", AuthorSchema)
