export const findMin = (nums: number[]): number => {
    if (!nums?.length) return -1;
    if (nums.length === 1) return nums[0];

    let left = 0;
    let right = nums.length - 1;

    let min = Infinity
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        //左边有序
        if (nums[left] <= nums[mid]) {
            min = Math.min(min, nums[left]);
            left = mid + 1;
        } else {
            min = Math.min(min, nums[mid]);
            right = mid - 1;
        }
    }

    return Math.min(min, nums[left]);
}