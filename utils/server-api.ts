export async function getApi<T>(path: string): Promise<T | undefined> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"

  try {
    const response = await fetch(`${baseUrl}${path}`, {
      cache: "no-store",
    })

    if (!response.ok) {
      console.error(`API Error: ${response.statusText} for path ${path}`)
      return undefined
    }

    return await response.json()
  } catch (error) {
    console.error(`Fetch error on ${path}:`, error)
    return undefined
  }
}
