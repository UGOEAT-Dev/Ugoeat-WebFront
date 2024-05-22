
export interface Cursor 
{
    currentPage: number,
    itemCount?: number
}

export const defaultCursor: Cursor = { currentPage: 0, itemCount: 10}