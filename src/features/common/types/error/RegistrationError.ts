import { Error } from "./Error";

export interface RegistrationError extends Error
{
    errors?: {
        name?: string,
        email?: string,
        password?: string,
        password_confirmation?: string,
        role?: string,
        address?: string,
        tel?: string
    }
}