export type Ingredient = {
    id: number,
    img_name: string,
    name: string,
    price: number
    stock: number
}


export type ResponseIngredient = {
    status: number,
    ingredient: Ingredient[]
}