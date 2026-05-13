const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

export async function getApi<T>(path: string): Promise<T | undefined> {
  const response = await fetch(`${BASE_URL}${path}`, { cache: "no-store" })
  if (!response.ok) return undefined
  return response.json()
}

export async function postApi<T>(
  path: string,
  data: unknown
): Promise<T | undefined> {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  return response.json()
}

export async function putApi<T>(
  path: string,
  data: unknown
): Promise<T | undefined> {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  return response.json()
}

export async function deleteApi(path: string, id: string): Promise<boolean> {
  const response = await fetch(`${BASE_URL}${path}/${id}`, { method: "DELETE" })
  return response.ok
}
