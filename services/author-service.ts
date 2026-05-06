import { Author } from "@/models/author-model"
import { mongooseConnect } from "@/utils/mongoose-client"

export const authorService = {
  getAll: async () => {
    await mongooseConnect()
    return await Author.find().sort({ createdAt: -1 })
  },

  create: async (data: any) => {
    await mongooseConnect()
    return await Author.create(data)
  },

  update: async (id: string, data: any) => {
    await mongooseConnect()
    return await Author.findByIdAndUpdate(id, data, { returnDocument: "after" })
  },

  delete: async (id: string) => {
    await mongooseConnect()
    return await Author.findByIdAndDelete(id)
  },
}
