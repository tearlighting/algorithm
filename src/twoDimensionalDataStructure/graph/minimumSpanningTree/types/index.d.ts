export interface IPoint<T> {
  value: T
  neighbor: IPoint<T>[]
}

export type TDistance = number[][]

interface I2PointsDistance<T> {
  from: IPoint<T>
  to: IPoint<T>
  distance: number
}
