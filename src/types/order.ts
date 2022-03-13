import { Ingredient } from "./ingredient"
import { Product } from "./product"

export type Order = {
    email: string | null,
    exclude_ingredients: [Ingredient],
    product: Product
}
