function lengthOfLongestSubstring(s: string): number {
  if (typeof s !== "string") return 0
  if (s.length <= 1) return s.length
  let left = 0,
    right = 0,
    maxLen = -Infinity

  let seen = new Set()
  while (right < s.length) {
    if (seen.has(s[right])) {
      //如果包含，怎么办
      //我第一反应其实是直接把left移到当前right,但是这样是不对的
      //正确的做法是移到重复字符的下一个位置
      maxLen = Math.max(maxLen, right - left)
      seen.delete(s[left])
      left++
    } else {
      seen.add(s[right])
      right++
    }
  }

  maxLen = Math.max(maxLen, right - left)
  return maxLen
}