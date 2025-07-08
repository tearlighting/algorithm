function createPalindromeHasher(s: string) {
  const base = 131n
  const mod = 10n ** 18n + 7n
  const n = s.length

  const prefixHash: bigint[] = [0n]
  const revPrefixHash: bigint[] = [0n]
  const pow: bigint[] = [1n]

  // 正向构造前缀哈希
  for (let i = 0; i < n; i++) {
    const code = BigInt(s.charCodeAt(i))
    prefixHash.push((prefixHash[i] * base + code) % mod)
    pow.push((pow[i] * base) % mod)
  }

  // 反向构造前缀哈希
  for (let i = 0; i < n; i++) {
    const code = BigInt(s.charCodeAt(n - 1 - i))
    revPrefixHash.push((revPrefixHash[i] * base + code) % mod)
  }

  // 获取 s[l..r] 的哈希值
  function getHash(hash: bigint[], l: number, r: number): bigint {
    return (hash[r + 1] - hash[l] * pow[r - l + 1] + mod * 2n) % mod
  }

  return {
    isPalindrome(l: number, r: number): boolean {
      const hash1 = getHash(prefixHash, l, r)
      const revL = n - 1 - r
      const revR = n - 1 - l
      const hash2 = getHash(revPrefixHash, revL, revR)
      return hash1 === hash2
    },
  }
}

function longestPalindrome(s: string): string {
  if (!s || !s.length || s.length < 2) return s
  //保证只有奇数情况
  const newStr = "#" + s.split("").join("#") + "#"
  const { isPalindrome } = createPalindromeHasher(newStr)
  const { getMaxKth } = creategetKth(isPalindrome)
  const res = getMaxKth(newStr)
  if (res.length) return res[0].value.replace(/#/g, "")
  return s.slice(0, 1)
}
console.log(longestPalindrome("eabcb"))
const { isPalindrome } = createPalindromeHasher("#e#a#b#c#b")
console.log(isPalindrome(5, 9))

function creategetKth(isPalindrome: (l: number, r: number) => boolean) {
  function getMaxKth(s: string, k: number = s.length, [x, y]: [number, number] = [0, k]): Array<{ k: number; value: string }> {
    if (k < 5 || x >= y || k > y) return []
    let left = 0,
      right = left + k - 1
    let res = {
      k: k,
      value: "",
    }

    while (right < s.length) {
      console.log(left, right, isPalindrome(left, right), s)

      if (isPalindrome(left, right)) {
        res.value = s.substring(left, right + 1)
        break
      }
      left++
      right++
    }
    console.log(res)

    if (!res.value) {
      let newK = Math.floor((x + y) / 2)

      if (newK % 2 === 0) {
        newK--
      }
      if (newK < 5) {
        newK = 5
      }

      return getMaxKth(s, newK, [x, k - 1])
    } else {
      let newK = Math.floor((x + y) / 2)

      if (newK % 2 === 0) {
        newK--
      }
      if (newK < 5) {
        newK = 5
      }
      const newRes = getMaxKth(s, newK, [k + 1, y])
      return [...newRes, res]
    }
  }
  return {
    getMaxKth,
  }
}
export {}
