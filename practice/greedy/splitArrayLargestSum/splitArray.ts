export const splitArray = (nums: number[], k: number): number => {
    if (!nums?.length) return 0;

    let left = Math.max(...nums);
    let right = nums.reduce((a, b) => a + b, 0);

    //二分法就是套路了
    while (left < right) {
        //首先注意，floor是向下取整，后默认左偏
        const mid = Math.floor((left + right) / 2);
        if (canSplit(nums, k, mid)) {
            //保留right是不会卡住的(因为会左边)
            right = mid;
        } else {
            //因为左偏，所以左边跨是没有问题的
            left = mid + 1;
        }
    }
    //其实退出条件本来就是left === right,你返回right其实也可以
    return left;

}

/**
 * 是否可以split出来k段小于等于max的子数组
 * @param nums 
 * @param k 
 * @param max 
 */
const canSplit = (nums: number[], k: number, max: number): boolean => {
    let count = 1;
    let sum = 0;
    for (let i = 0; i < nums.length; i++) {
        if (sum + nums[i] > max) {
            count++;
            if (count > k) return false;
            sum = nums[i];
        } else {
            sum += nums[i];
        }
    }
    //其实不够是可以的，因为我们是更贪心的切，你可以从贪心的地方分点出来也是可以切的
    return count <= k;
}