import { EMAX } from "./config"
import { kruskal } from "./kruskal"
import { prim } from "./prim"
import { IPoint } from "./types"

class Point<T> implements IPoint<T> {
  constructor(public value: T, public neighbor: IPoint<T>[] = []) {}
}

const points = ["A", "B", "C", "D", "E"].map((v) => new Point(v))
const MAX = EMAX.max

const distance = [
  [0, 4, 7, MAX, MAX],
  [4, 0, 8, 6, MAX],
  [7, 8, 0, 5, MAX],
  [MAX, 6, 5, 0, 7],
  [MAX, MAX, MAX, 7, 0],
]
// prim(points, distance, points[0])
kruskal(points, distance)
console.log(points)
