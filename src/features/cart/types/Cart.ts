import { Product, ProductOrdered } from "@/features/common/types/Product";


export interface ICart
{
    products: ProductOrdered[]
}

export class Cart implements ICart
{
    products: ProductOrdered[];

    constructor(products?: ProductOrdered[])
    {
        this.products = products ?? []
    }

    static copy(cart: Cart): Cart {
        return new Cart(cart.products)
    }

    addProduct({id, name, price, image_url}: Product, count: number = 1): Cart
    {
        let index = this.searchProduct(id)
        if(index === -1)
            this.products.push({id, name, price, image_url, quantity: count})
        else 
            this.products[index].quantity += count

        return this
    }

    removeProduct(product: Product, count: number = 1): Cart
    {
        let index = this.searchProduct(product.id)
        if(index >= 0) {
            this.products[index].quantity -= count

            this.check()
        }
        return this
    }

    public removeAll(): Cart {
        this.products = []
        return this
    }

    public productCount(): number
    {
        let total = 0

        return total
    }

    private searchProduct(id: number): number
    {
        return this.products.findIndex(p => p.id === id)
    }

    calculateTotalAmount(): number 
    {
        let total = 0    
        this.products.forEach((p) => {
            total += (p.price ?? 0) * (p.quantity)
        })
        return total
    }

    private check()
    {    
        this.products = this.products.filter(p => p.quantity > 0)
    }

}