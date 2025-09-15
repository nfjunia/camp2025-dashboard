export interface User {
  id: number
  name: string
  email: string
  gender: "Male" | "Female"
  age: number
  isKid: boolean
  isHerald: boolean
  network: string
  phone: string
  address: string
  joinDate: string
  avatar?: string
}

export interface UserFormData {
  name: string
  email: string
  gender: "Male" | "Female"
  age: number
  isKid: boolean
  isHerald: boolean
  network: string
  phone: string
  address: string
}

export type FilterValue = "all" | "yes" | "no" | string
export type GenderFilter = "all" | "Male" | "Female"
export type BooleanFilter = "all" | "yes" | "no"
