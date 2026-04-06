export function search(nums: number[], target: number) {
    if (!nums || !nums.length) return -1
    let left = 0, right = nums.length - 1
    while (left < right) {
        const mid = Math.floor((left + right) / 2)
        if (nums[mid] === target) return mid
        if (nums[mid] > target) right = mid - 1
        else left = mid + 1
    }
    return left
}