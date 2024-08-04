
export type SearchTagType = 'products'|'restaurants'|'categories'
export interface SearchOptions
{
    query: string,
    tag?: SearchTagType
}