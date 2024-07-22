import { User, UserImpl } from "./User";

export interface Restaurant extends User 
{
    slug?: string
}

export class RestaurantImpl extends UserImpl implements Restaurant
{
    // async getProducts(): Promise<Product[]>
    // {
    //     return []
    // }
}