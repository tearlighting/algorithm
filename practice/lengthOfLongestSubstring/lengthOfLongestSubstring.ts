function lengthOfLongestSubstring(s: string): number {
  const n = s.length
  let left = 0
  let right = 0
  let maxLength = 0

  const set = new Set<string>()
  //滑块
  while (right < n) {
    if (!set.has(s[right])) {
      set.add(s[right])
      right++
      maxLength = Math.max(maxLength, right - left)
    } else {
      set.delete(s[left])
      left++
    }
  }

  return maxLength
}
