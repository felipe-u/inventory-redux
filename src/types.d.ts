export type ProductId = number

export interface Product {
  title: string
  category: string
  price: number
  stock: number
  thumbnail: string
}

export interface ProductWithId extends Product {
    id: ProductId
}