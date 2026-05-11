import { City } from "@/models/city-model"
import { type ICity } from "@/types/city-t"
import { connectMongoose } from "@/utils/mongoose-client"
import { Types } from "mongoose"

type LeanCity = {
  _id: Types.ObjectId
  name: string
}

export class CityService {
  async getAll(): Promise<ICity[]> {
    await connectMongoose()

    const cities = (await City.find()
      .sort({ name: 1 })
      .lean()) as unknown as LeanCity[]

    return cities.map((city) => ({
      ...city,
      id: city._id.toString(),
    })) as ICity[]
  }

  async save(city: Omit<ICity, "id">): Promise<void> {
    await connectMongoose()

    const existing = await City.findOne({
      name: { $regex: new RegExp(`^${city.name}$`, "i") },
    })
    if (existing) throw new Error("Toks miestas jau egzistuoja!")

    await City.create(city)
  }

  async update(city: ICity): Promise<void> {
    await connectMongoose()

    const { id, ...updateData } = city
    if (!id) throw new Error("Atnaujinimui reikalingas ID")

    const existing = await City.findOne({
      _id: { $ne: new Types.ObjectId(id) },
      name: { $regex: new RegExp(`^${updateData.name}$`, "i") },
    })
    if (existing)
      throw new Error("Kitas miestas su tokiu pavadinimu jau egzistuoja!")

    await City.updateOne({ _id: new Types.ObjectId(id) }, updateData)
  }

  async delete(id: string): Promise<void> {
    await connectMongoose()
    await City.deleteOne({ _id: new Types.ObjectId(id) })
  }
}
