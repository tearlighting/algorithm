export const findMin = (nums: number[]): number => {
    if (!nums?.length) return -1;
    if (nums.length === 1) return nums[0];
    let left = 0;
    let right = nums.length - 1;
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        //旋转点在右边
        if (nums[mid] > nums[right]) {
            left = mid + 1
        } else if (nums[mid] < nums[right]) {
            //旋转点在左边
            right = mid
        } else {
            right--
        }
    }
    return nums[left]
}