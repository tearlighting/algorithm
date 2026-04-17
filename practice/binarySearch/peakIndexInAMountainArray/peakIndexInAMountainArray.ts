export function peakIndexInMountainArray(arr: number[]): number {
    if (!arr?.length) return -1
    if (arr.length === 1) return 0

    let left = 0, right = arr.length - 1

    while (left < right) {
        let mid = Math.floor((left + right) / 2)
        //还在单调增
        if (arr[mid] < arr[mid + 1]) {
            left = mid + 1
        } else {
            right = mid
        }
    }
    return left
};