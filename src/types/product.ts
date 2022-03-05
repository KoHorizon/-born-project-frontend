export type Product = {
    id: number,
    name: string,
    img_name: string,
    availability: boolean,
    custom: boolean,
    day_special: boolean,
    price: number
}

export type ResponseProducts = {
    status: number,
    product: Product[]
}