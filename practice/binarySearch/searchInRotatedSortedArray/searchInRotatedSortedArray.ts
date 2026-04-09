export function search(nums: number[], target: number): number {
    if (!nums?.length) return -1
    if (nums.length === 1) return nums[0] === target ? 0 : -1
    let left = 0;
    let right = nums.length - 1;
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (target === nums[mid]) return mid
        //左边有序,为啥=，因为[2,1]这种，[0,0]其实确实是有序的，反而[0,1]这种才是无序的
        if (nums[left] <= nums[mid]) {
            //如果在左边里面有
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            //右边有序
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

    }
    return target === nums[left] ? left : -1
};