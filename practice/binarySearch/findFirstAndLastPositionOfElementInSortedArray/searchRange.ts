function searchRange(nums: number[], target: number): number[] {
    if (!nums.length) return [-1, -1];
    const left = findLeftLimit(nums, target);
    const right = findRightLimit(nums, target);
    if (left > right || nums[left] !== target) return [-1, -1];
    return [left, right];
};

//找第一个>=x的index
const findLeftLimit = (nums: number[], target: number) => {
    let left = 0;
    let right = nums.length - 1;
    while (left < right) {
        //左偏，right可以放心保留
        const mid = Math.floor((right + left) / 2);
        if (nums[mid] >= target) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    return left;
}

//找最后一个<=x的index
const findRightLimit = (nums: number[], target: number) => {
    let left = 0;
    let right = nums.length - 1;
    while (left < right) {
        //因为你会保留left,不加1会陷入死循环
        const mid = Math.floor((right + left + 1) / 2);
        if (nums[mid] <= target) {
            left = mid;
        } else {
            right = mid - 1;
        }
    }
    return left;
}