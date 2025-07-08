function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  //偶数
  if ((nums1.length + nums2.length) % 2 === 0) return (getKth(nums1, nums2, (nums1.length + nums2.length) / 2) + getKth(nums1, nums2, (nums1.length + nums2.length) / 2 + 1)) / 2
  //奇数
  return getKth(nums1, nums2, Math.floor((nums1.length + nums2.length) / 2) + 1)
}
function getKth(nums1: number[], nums2: number[], k: number, pointNum1 = 0, pointNum2 = 0): number {
  if (nums1.length - pointNum1 + nums2.length - pointNum2 < k || k <= 0) return -1
  if (nums1.length - pointNum1 && !(nums2.length - pointNum2)) return nums1[k + pointNum1 - 1]
  if (!(nums1.length - pointNum1) && nums2.length - pointNum2) return nums2[k + pointNum2 - 1]
  if (k === 1) return Math.min(nums1[pointNum1], nums2[pointNum2])

  const half = Math.min(Math.floor(k / 2), nums1.length - pointNum1)
  const rest = k - half
  //谁小扔一半
  if (nums1[pointNum1 + half - 1] > nums2[pointNum2 + rest - 1]) {
    return getKth(nums1, nums2, k - rest, pointNum1, pointNum2 + rest)
  } else {
    return getKth(nums1, nums2, k - half, pointNum1 + half, pointNum2)
  }
}
