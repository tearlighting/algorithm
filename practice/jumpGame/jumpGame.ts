function canJump(nums: number[]) {
    if (nums.length == 0) return false
    if (nums.length == 1) return true
    return jump(nums)
}
/**
 *
 * @param nums
 * @param index 当前下标
 * @param reachable 最远能到下标
 * @returns
 */
function jump(nums: number[], index = 0, reachable = nums[0]): boolean {
    if (index > reachable) return false
    if (reachable >= nums.length - 1) return true
    return jump(nums, index + 1, Math.max(reachable, nums[index] + index))
}