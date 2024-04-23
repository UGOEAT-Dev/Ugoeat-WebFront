
export type Mutator<T> = (t: T) => void

export class MutatorFactory
{
    static createEmpty<T>(){
        return (_t: T) => {
            // console.log(t)
        }
    }
}