import { OrderState } from "../types/Order"

export function getSeverityFromOrderState(state?: OrderState)
{
    switch (state)
    {
        case 'sent':
            return 'info'
        case 'accepted':
            return 'success'
        default:
            return 'danger'
    }
}