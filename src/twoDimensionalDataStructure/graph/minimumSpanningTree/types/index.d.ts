export interface IPoint<T>{
	value:T
	neighbor:IPoint<T>[]
}

export type TDistance = number[][]