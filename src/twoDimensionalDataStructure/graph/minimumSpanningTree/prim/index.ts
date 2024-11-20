import { EMAX } from "../config"
import { I2PointsDistance, IPoint } from "../types"
/**
 * 普利姆算法
 * 找最近的点
 * @param points
 * @param distance
 * @param start
 * @returns
 */
export function prim<T>(points: IPoint<T>[], distance: number[][], start: IPoint<T>) {
  const linkedPoints = [start]
  const res: I2PointsDistance<T>[] = []
  while (linkedPoints.length < points.length) {
    const detail = getMinDisNode(points, distance, linkedPoints)
    res.push(detail)
    const { to, from } = detail
    from.neighbor.push(to)
    to.neighbor.push(from)
    linkedPoints.push(to)
  }
  return res
}

function getMinDisNode<T>(points: IPoint<T>[], distance: number[][], linkedPoints: IPoint<T>[]): I2PointsDistance<T> {
  const res: I2PointsDistance<T> = {
    from: null,
    to: null,
    distance: EMAX.max,
  }
  for (let linkedPoint of linkedPoints) {
    const dis = get2OtherPointDistanceByPoint(points, distance, linkedPoint)
    for (let i of dis) {
      const to = points[dis.indexOf(i)]
      if (!linkedPoints.includes(to) && i && i < res.distance) {
        res.distance = i
        res.from = linkedPoint
        res.to = to
      }
    }
  }
  return res
}

export function get2OtherPointDistanceByPoint<T>(points: IPoint<T>[], distance: number[][], point: IPoint<T>): number[] {
  const index = points.indexOf(point)
  if (index > -1 && index < distance.length) return distance[index]
  throw new Error("get instance failed")
}
