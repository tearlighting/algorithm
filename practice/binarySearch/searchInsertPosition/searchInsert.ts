export const searchInsert = (nums: number[], target: number): number => {
    let left = 0;
    let right = nums.length - 1;

    let mid = Math.floor((left + right) / 2);

    while (left < right) {
        if (nums[mid] > target) {
            right = mid - 1;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            return mid;
        }
    }
    return left;
}