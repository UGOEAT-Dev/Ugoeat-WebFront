import { Error } from "./Error";

export interface ProductError extends Error
{
    errors?: {
        name?: string,
        description?: string,
        price?: string
    }
}