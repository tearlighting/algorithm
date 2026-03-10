ssh -i tearlighting.pem ubuntu@54.66.247.81
scp -i tearlighting.pem -r blog ubuntu@54.66.247.81:/home/ubuntu/sites/

実は最近、一番悩んだのは仕事の機能開発ではなくて、LeetCode で解いた正規表現のマッチング問題でした。
最初は再帰でいけると思っていて、僕にとって再帰って昔から美しさがあって、フィボナッチ数列みたいなシンプルな問題なら楽勝なんです。
でもこの問題は再帰だけだとうまくパターンを見つけられなくて、DP（動的計画法）を使わないといけないと気づきました。
ただ、DP の表が一次元ならまだしも、二次元になった途端に、自分の理解が全然足りないと実感しました。
横軸と縦軸が何を意味して、どこに依存して状態が変わるのか、感覚的にまだ掴めていません。
正規表現自体も普段はブラックボックスとして使っているだけで、中身の動作原理までは全然意識していなかったんだなと改めて思いました。
僕は元々ブラックボックスが苦手で、Vue のリアクティブや SSR も自分で手作りしたことがありますし、React のコアもいつか自分で書いてみたいと思っています。
だから今回のアルゴリズム問題は、自分がまだまだ理解が浅いことを思い出させてくれたし、学び続けるきっかけになりました。
これが最近、自分にとって一番大きな学びでした。
getBoundingClientRect=> IntersectionObserver
Actually, the most challenging part for me recently was not about implementing a specific feature at work, but solving a LeetCode problem about regular expression matching.
At first, I thought I could handle it with recursion. Recursion always has a certain beauty for me — simple problems like Fibonacci are elegant and easy to express that way.
But with this regex problem, I realized recursion alone didn’t work well. I had to use DP (dynamic programming) instead.
When the DP table was one-dimensional, it was fine, but once it turned into a two-dimensional table, I got stuck.
I couldn’t figure out clearly what the X and Y axes really represented, or how the states should transfer.
It made me realize that a regex engine itself is like a black box — and solving this kind of algorithm is basically about understanding and building that black box from scratch.
I’ve always disliked black boxes. For example, I’ve written my own version of Vue’s reactivity and SSR before, and someday I want to do the same with React’s core too.
So for me, this small algorithm challenge reminded me that there’s still a lot I don’t fully understand yet — and it’s exactly this kind of thing that keeps me motivated to dig deeper.
This is what I’d say was my most meaningful “recent difficulty”.
| 中文 | 英文 | 日语（常用说法） | 备注 |
| ------- | -------------------------- | ------------------- | --------------------- |
| 贪心算法 | Greedy Algorithm | 貪欲法（たんよくほう） | 很多人也直接说 **Greedy** |
| 滑动窗口 | Sliding Window | スライディングウィンドウ | 几乎就是外来语直接 katakana |
| 二分法（折半） | Binary Search | 二分探索（にぶんたんさく） | 「探索」比「検索」更贴近搜索树里的“搜索” |
| 树 | Tree | ツリー | 外来语直接说「ツリー」，听了立刻懂 |
| 深度优先搜索 | Depth First Search (DFS) | 深さ優先探索（ふかさゆうせんたんさく） | DFS 也可直接说「DFS」 |
| 广度优先搜索 | Breadth First Search (BFS) | 幅優先探索（はばゆうせんたんさく） | BFS 也可直接说「BFS」 |

## 1️⃣ 贪心（Greedy）

**单调性(dt,sum),手动构造单调性(排序),区间覆盖**

模式：局部最优 ➜ 推导全局最优
典型题：

LeetCode 55. Jump Game （跳跃游戏）

LeetCode 45. Jump Game II （最少跳跃次数）

LeetCode 435. Non-overlapping Intervals （无重叠区间）

```ts
function canJump(nums: number[]): boolean {
  let reach = 0
  for (let i = 0; i < nums.length; i++) {
    if (i > reach) return false
    //覆盖
    reach = Math.max(reach, i + nums[i])
  }
  return true
}
```

## 🟢 2️⃣ 二分搜索（Binary Search）

模式：有序 ➜ 单调性 ➜ 找上下界
典型题：

LeetCode 704. Binary Search （标准二分）

LeetCode 35. Search Insert Position （插入位置）

LeetCode 69. Sqrt(x) （开平方）

LeetCode 378. Kth Smallest Element in a Sorted Matrix

例子（Search Insert）：

```ts
function myBinarySearch() {
  const arr = [0, 1, 2, 3, 4, 5]
  //第一个大于2的数
  let left = 0
  let right = arr.length - 1
  //左闭右开指的是右侧不可达，就是不可能交叉，最后的状态就是重叠，返回谁都可以
  while (left < right) {
    //右边保留了，右边虽然危险，但是本身mid偏左，所以没有事
    const mid = Math.floor((left + right) / 2)
    console.log(left, right, arr[mid], mid)
    if (arr[mid] >= 2) {
      //大了，右边缩
      //只是表示只是不能这次跨，之后的合法情况还是可以跨的
      right = mid
      //如果你想这次就跨，有可能你就跨到非法的了，这时就会出现交叉了，所以你也必须让循环条件可以允许交叉
      //   while (left <= right)
      //   right = mid - 1
    } else {
      //小了，左边跨过没有负担
      left = mid + 1
    }
  }
  return left
  //不存在最后一个大于2这种东西，这是有序的啊，最后一个就是length-1啊
  //最后小于1的数
  while (left < right) {
    console.log(left, right)
    //这里需要加1避免动不了死循环,否则你想像一下left=0,right=1,那么mid=0就死循环了
    //你想像一下，这个[0,1]是不是左边保留比较危险，而且默认向下取整就偏左，所以要加1
    const mid = Math.floor((left + right + 1) / 2)
    if (arr[mid] < 1) {
      //我不知道是不是最后一个，不能现在直接跨
      left = mid
    } else {
      //安心跨完事
      right = mid - 1
    }
  }
  return left //or right
}
function searchInsert(nums: number[], target: number, left = 0, right = nums.length - 1): number {
  if (right < left) return left
  const mid = Math.floor((left + right) / 2)
  if (target > nums[mid]) {
    left = mid + 1
  } else if (target < nums[mid]) {
    right = mid - 1
  } else {
    return mid
  }
  return recurse(nums, target, left, right)
}
```

# 🟢 3️⃣ 滑动窗口（Sliding Window）

模式：动态区间 ➜ 左右指针
典型题：

LeetCode 3. Longest Substring Without Repeating Characters

LeetCode 76. Minimum Window Substring

LeetCode 438. Find All Anagrams in a String

例子（最长不重复子串）：

ts
复制
编辑
function lengthOfLongestSubstring(s: string): number {
const map = new Map()
let left = 0, res = 0
for (let right = 0; right < s.length; right++) {
if (map.has(s[right])) {
left = Math.max(left, map.get(s[right]) + 1)
}
map.set(s[right], right)
res = Math.max(res, right - left + 1)
}
return res
}

# 🟢 4️⃣ 一维 DP

模式：前一状态 ➜ 当前状态
典型题：

LeetCode 53. Maximum Subarray （最大连续和）

LeetCode 70. Climbing Stairs （爬楼梯）

LeetCode 198. House Robber （打家劫舍）

例子（最大连续和）：

ts
复制
编辑
function maxSubArray(nums: number[]): number {
let sum = nums[0], maxSum = nums[0]
for (let i = 1; i < nums.length; i++) {
sum = Math.max(nums[i], sum + nums[i])
maxSum = Math.max(maxSum, sum)
}
return maxSum
}

# 🟢 5️⃣ 二维 DP

模式：状态转移表 ➜ 表达子问题关系
典型题：

LeetCode 10. Regular Expression Matching （正则匹配）

LeetCode 72. Edit Distance （编辑距离）

LeetCode 1143. Longest Common Subsequence （最长公共子序列）

例子（编辑距离）：

ts
复制
编辑
function minDistance(word1: string, word2: string): number {
const m = word1.length, n = word2.length
const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0))
for (let i = 0; i <= m; i++) dp[i][0] = i
for (let j = 0; j <= n; j++) dp[0][j] = j
for (let i = 1; i <= m; i++) {
for (let j = 1; j <= n; j++) {
if (word1[i - 1] === word2[j - 1]) dp[i][j] = dp[i - 1][j - 1]
else dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1
}
}
return dp[m][n]
}

# 🟢 6️⃣ DFS（深度优先搜索）

模式：递归 ➜ 回溯 ➜ 树/图遍历
典型题：

LeetCode 46. Permutations （全排列）

LeetCode 78. Subsets （子集）

LeetCode 22. Generate Parentheses （括号生成）

例子（子集）：

ts
复制
编辑
function subsets(nums: number[]): number[][] {
const res: number[][] = []
function dfs(path: number[], index: number) {
res.push([...path])
for (let i = index; i < nums.length; i++) {
path.push(nums[i])
dfs(path, i + 1)
path.pop()
}
}
dfs([], 0)
return res
}

# 🟢 7️⃣ BFS（广度优先搜索）

模式：一层一层扩展 ➜ 队列
典型题：

LeetCode 102. Binary Tree Level Order Traversal （层序遍历）

LeetCode 200. Number of Islands （岛屿数量）

LeetCode 752. Open the Lock （最短路径）

例子（层序遍历）：

ts
复制
编辑
function levelOrder(root: TreeNode | null): number[][] {
const res: number[][] = []
if (!root) return res
const queue = [root]
while (queue.length) {
const level: number[] = []
const len = queue.length
for (let i = 0; i < len; i++) {
const node = queue.shift()!
level.push(node.val)
if (node.left) queue.push(node.left)
if (node.right) queue.push(node.right)
}
res.push(level)
}
return res
}
