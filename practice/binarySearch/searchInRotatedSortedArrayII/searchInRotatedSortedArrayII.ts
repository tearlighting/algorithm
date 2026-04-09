export const search = (nums: number[], target: number): boolean => {
    if (!nums?.length) return false
    if (nums.length === 1) return nums[0] === target

    let left = 0
    let right = nums.length - 1

    while (left < right) {
        //左偏的mid
        const mid = Math.floor((left + right) / 2)
        if (nums[mid] === target) return true
        //左半有序(不能等于，因为有重复)
        if (nums[left] < nums[mid]) {
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1
            } else {
                left = mid + 1
            }
        } else if (nums[left] > nums[mid]) {
            //左半不有序，那么右半有序
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1
            } else {
                right = mid - 1
            }
        } else {
            //nums[left] === nums[mid]
            //我不知道哪边是有序的，但是left的值是和mid的值一样的，直接跨过去
            left++
        }
    }
    return target === nums[left]
}