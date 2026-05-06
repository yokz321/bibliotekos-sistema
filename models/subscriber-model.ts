import mongoose, { Schema, model, models } from "mongoose"

const SubscriberSchema = new Schema(
  {
    firstName: { type: String, required: [true, "Vardas privalomas"] },
    lastName: { type: String, required: [true, "Pavardė privaloma"] },
    email: {
      type: String,
      required: [true, "El. paštas privalomas"],
      unique: true,
    },
    phone: { type: String },
    ticketNumber: {
      type: String,
      required: [true, "Pažymėjimo numeris privalomas"],
      unique: true,
    },
  },
  { timestamps: true }
)

export const Subscriber =
  models.Subscriber || model("Subscriber", SubscriberSchema)
