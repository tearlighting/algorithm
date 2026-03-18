export const jump = (nums: number[]): number => {
    if (!nums || nums.length <= 1) return 0;
    return jumper(nums);
}

const jumper = (nums: number[], index = 0, currentReachable = nums[0], reachable = nums[0], step = 0) => {
    if (currentReachable >= nums.length - 1) return step + 1;
    reachable = Math.max(reachable, index + nums[index]);
    if (index >= currentReachable) {
        currentReachable = reachable;
        step++;
    }

    return jumper(nums, index + 1, currentReachable, reachable, step);
}