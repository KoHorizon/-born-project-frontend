import { Ingredient } from "./ingredient"
import { Product } from "./product"

export type Order = {
    email: string | null,
    exclude_ingredients: [Ingredient],
    product: Product
}



export type OrderKitchen = {
    order: number,
    orderProduct: [OrderContent]
}

export type OrderContent = {
    product : Product,
    ingredient: [Ingredient]
    excludedIngredient: [Ingredient]
}