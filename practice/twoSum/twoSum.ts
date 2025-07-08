function twoSum(nums: number[], target: number): number[] {
  const res: number[] = []
  //查找用hash的复杂度为O(1)
  const map = new Map<number, number>()
  for (let i = 0; i < nums.length; i++) {
    const rest = target - nums[i]
    if (map.has(rest)) {
      res.push(map.get(rest) as number, i)
      return res
    } else {
      map.set(nums[i], i)
    }
  }
  return res
}
