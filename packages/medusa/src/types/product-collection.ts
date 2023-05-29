export type CreateProductCollection = {
  title: string
  handle?: string
  description?: string
  images?: string[]
  thumbnail?: string
  type?: string
  metadata?: Record<string, unknown>
}

export type UpdateProductCollection = {
  title?: string
  handle?: string
  description?: string
  images?: string[]
  thumbnail?: string
  type?: string
  metadata?: Record<string, unknown>
}
