import { AuthorService } from "@/services/author-service"
import { type NextRequest } from "next/server"

export async function GET() {
  const service = new AuthorService()
  const data = await service.getAll()
  return Response.json(data)
}

export async function POST(request: NextRequest) {
  try {
    const res = await request.json()
    const service = new AuthorService()
    await service.save(res)
    return Response.json({ message: "Autorius sėkmingai pridėtas" })
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 400 })
  }
}
