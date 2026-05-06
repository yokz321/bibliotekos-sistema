import mongoose, { Schema, model, models } from "mongoose"

const PublisherSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Pavadinimas privalomas"],
      unique: true,
      trim: true,
    },
    location: { type: String },
  },
  { timestamps: true }
)

export const Publisher = models.Publisher || model("Publisher", PublisherSchema)
