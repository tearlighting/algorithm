export const findMinArrowShots = (points: number[][]): number => {
    if (!points?.length) return 0
    points.sort((a, b) => a[1] - b[1]);
    return greedy(points) || binarySearch(points)
}


/**
 * 二分法肯定是可以做出来的
 * @param points 
 */
const binarySearch = (points: number[][]): number => {
    let left = 1, right = points.length;
    while (left < right) {
        //惯例的左偏，右边可以安心保留
        const mid = Math.floor((left + right) / 2);
        if (canShot(points, mid)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    return left
}
/**
 * 当然我在这几个arrow是不是可以射爆的时候，你还是贪心去算了，也算了脱了裤子放屁了。关键是，我如果不用射最后，我也确实不知道射什么地方！！
 * @param points 
 * @param arrow 
 * @returns 
 */
const canShot = (points: number[][], arrow: number): boolean => {
    let count = 0;
    let index = 0
    let arrowEnd = -Infinity
    while (index < points.length) {
        const [start, end] = points[index++];
        //可以射爆
        if (arrowEnd >= start) {
            //skip
            continue
        } else {
            arrowEnd = end;
            count++;
        }
    }

    return arrow >= count;

}

const greedy = (points: number[][], index = 0, count = 0, arrowEnd = -Infinity): number => {
    if (index >= points.length) return count
    const [start, end] = points[index];
    //能射爆
    if (arrowEnd >= start) {
        return greedy(points, index + 1, count, arrowEnd)
    } else {
        return greedy(points, index + 1, count + 1, end)
    }
}