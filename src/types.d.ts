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

export interface UIOptions {
  isFormModalOpen: boolean
  selectedProductId: ProductId
  formModalMode: 'new' | 'edit'
  filters: { title: string; category: string; lowStock: boolean }
}
