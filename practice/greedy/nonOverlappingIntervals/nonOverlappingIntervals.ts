export function eraseOverlapIntervals(intervals: number[][]): number {
    return recurse(intervals.sort((a, b) => a[1] - b[1]))
}

function recurse(sortedIntervals: number[][], left = 0, right = 1, res = 0) {

    if (right > sortedIntervals.length - 1) return res
    const leftNode = sortedIntervals[left]
    const rightNode = sortedIntervals[right]
    if (leftNode[1] > rightNode[0]) {
        //重叠保留left
        res++
    } else {
        //left 移到 right位置
        left = right
    }
    right++
    return recurse(sortedIntervals, left, right, res)
}