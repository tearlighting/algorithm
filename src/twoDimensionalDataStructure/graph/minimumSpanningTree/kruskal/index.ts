import { EMAX } from "../config"
import { get2OtherPointDistanceByPoint } from "../prim"
import { IPoint, TDistance, I2PointsDistance } from "../types"
/**
 * 克鲁斯卡尔算法
 * 找最小边
 * @param points
 * @param distance
 */
export function kruskal<T>(points: IPoint<T>[], distance: TDistance) {
  const tribes: Array<IPoint<T>[]> = []
  const minLine: I2PointsDistance<T> = {
    to: null,
    from: null,
    distance: EMAX.max,
  }

  //   tribes.length !== 1 || tribes[0].length !== points.length
  while (tribes.length !== 1 || tribes[0].length !== points.length) {
    for (const point of points) {
      const dis = get2OtherPointDistanceByPoint(points, distance, point)
      for (const i of dis) {
        const to = points[dis.indexOf(i)]
        if (i && minLine.distance > i && canLink(tribes, point, to)) {
          minLine.distance = i
          minLine.from = point
          minLine.to = to
        }
      }
    }

    link(tribes, minLine.from, minLine.to)
    minLine.distance = EMAX.max
    // console.log(minLine, tribes)
    console.log("t>>", tribes)
  }
}

function canLink<T>(tribes: Array<IPoint<T>[]>, from: IPoint<T>, to: IPoint<T>): boolean {
  const tribe1 = tribes.find((x) => x.includes(from))
  const tribe2 = tribes.find((x) => x.includes(to))
  return tribe1 !== tribe2 || (!tribe1 && !tribe2)
}

function link<T>(tribes: Array<IPoint<T>[]>, from: IPoint<T>, to: IPoint<T>) {
  const tribe1 = tribes.find((x) => x.includes(from))
  const tribe2 = tribes.find((x) => x.includes(to))
  //两个point都没有部落
  if (!tribe1) {
    tribes.push([from, to])
  } else if (tribe1 && !tribe2) {
    tribe1.push(to)
  } else if (!tribe1 && tribe2) {
    tribe2.push(from)
  } else {
    tribe1.push(...tribe2)
    tribes.splice(tribes.indexOf(tribe2), 1)
  }

  from.neighbor.push(to)
  to.neighbor.push(from)
}
