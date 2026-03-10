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

**单调性(dt,sum),手动构造单调性(排序),区间覆盖(区域 reachable=>整体 reachable)**

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

**模式：（有序 ➜ 单调性）|| (check) ➜ 定界**
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
    //这里有时需要+1使之往后偏移1，防止死循环。
    //首先，你需要明确向下取整默认是偏左的，所以你保留了right,mid还是会左偏，不会死循环
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
    //因为你保留了left，你还左偏，这肯定是会炸的，必须+1让mid右偏
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

**模式：动态区间 ➜ 左右指针 ➜ 动态维护窗口内状态（Map/Set） ➜ 子集问题**
典型题：

LeetCode 3. Longest Substring Without Repeating Characters

LeetCode 76. Minimum Window Substring

LeetCode 438. Find All Anagrams in a String

例子（最长不重复子串）：

```ts
function checkMapValid(checkMap: Map<string, number>, slidingWindowMap: Map<string, number>): boolean {
  for (const [key, value] of checkMap) {
    if ((slidingWindowMap.get(key) || 0) < value) {
      return false
    }
  }
  return true
}
function findAnagrams(s: string, p: string): number[] {
  if (s.length < p.length) return []
  const checkMap = new Map<string, number>()
  for (const char of p) {
    checkMap.set(char, (checkMap.get(char) || 0) + 1)
  }
  console.log(checkMap)

  return recurse(s, p.length, checkMap)
}

function recurse(s: string, len: number, checkMap: Map<string, number>, slideWindowMap: Map<string, number> = new Map<string, number>(), index: number = 0, res: number[] = []): number[] {
  const right = index
  const left = right - len
  if (right > s.length) return res
  //我是感觉这块初始化内容写这里太操蛋了，在外面初始化的话，感觉写的更舒服也不用考虑这东西
  if (right < len) {
    slideWindowMap.set(s[right], (slideWindowMap.get(s[right]) || 0) + 1)
    return recurse(s, len, checkMap, slideWindowMap, right + 1, res)
  }
  checkMapValid(checkMap, slideWindowMap) && res.push(left)
  slideWindowMap.set(s[right], (slideWindowMap.get(s[right]) || 0) + 1)
  slideWindowMap.set(s[left], (slideWindowMap.get(s[left]) || 0) - 1)

  return recurse(s, len, checkMap, slideWindowMap, right + 1, res)
}
```

# 🟢 4️⃣ 一维 DP

**模式：前一状态 ➜ 当前状态(要注意怎么建模，这个 f(x)的 x 你先搞明白)**
典型题：

LeetCode 70. Climbing Stairs （爬楼梯）

LeetCode 198. House Robber （打家劫舍）

例子（最大连续和）：

```ts
function deleteAndEarn(nums: number[]) {
  const max = Math.max(...nums)
  //通过值的关系重新建模
  const count = Array(max + 1).fill(0)

  for (const num of nums) {
    count[num] += 1
  }
  const memory = new Map<number, number>()
  memory.set(0, 0)
  memory.set(1, count[1])
  function f(n: number): number {
    if (memory.has(n)) return memory.get(n)!
    const res = Math.max(f(n - 1), f(n - 2) + n * count[n])
    memory.set(n, res)
    return res
  }
  return f(max)
}

const nums = [2, 2, 3, 3, 3, 4]

//树形结构
function rob(root: TreeNode | null) {
  const [notRob, rob] = recurse(root)
  return Math.max(notRob, rob)
}

function recurse(root: TreeNode | null): [number, number] {
  if (!root) return [0, 0]
  const [notRob, rob] = recurse(root.left)
  const [notRob2, rob2] = recurse(root.right)
  //不能因为父节点去影响子节点的选择
  //f(x) = max(f(x-1), f(x-2) + x)
  return [Math.max(notRob, rob) + Math.max(notRob2, rob2), notRob + notRob2 + root.val]
}

function lengthOfLIS(nums: number[]): number {
  return recurse(nums)
}
function recurse(nums: number[], i: number = nums.length, memory = new Map<number, number>()): number {
  if (i === 1) return 1
  if (memory.has(i)) return memory.get(i)!
  let res: number = 1
  for (let j = 1; j < i; j++) {
    if (nums[i - 1] > nums[j - 1]) {
      res = Math.max(res, recurse(nums, j, memory) + 1)
    }
  }
  memory.set(i, res)
  return res
}

function numDecodings(s: string): number {
  if (!s.length || s[0] === "0") return 0
  const dp = Array(s.length + 1).fill(0)
  dp[0] = 1
  dp[1] = 1

  for (let i = 2; i <= s.length; i++) {
    const single = Number(s.slice(i - 1, i))
    const double = Number(s.slice(i - 2, i))
    //非0 就可以在前一种组合后面直接拼一个
    if (single > 0 && single < 10) {
      dp[i] += dp[i - 1]
      //再拼两位数，如果合法就加上
      if (double > 10 && double < 27) {
        dp[i] += dp[i - 2]
      }
    } else {
      //0的话只能和前面拼一起
      if (double >= 10 && double < 27) {
        dp[i] += dp[i - 2]
      } else {
        return 0
      }
    }
  }
  return dp[s.length]
}
```

# 🟢 5️⃣ 二维 DP

先往后推一下，感觉一维我都有问题，二维会炸。之后还有图和排序，那个放到下一阶段。

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

**模式：递归 ➜ 回溯(这种后续遍历的记录是 BFS 无法轻易实现的) ➜ 树/图遍历**
典型题：

LeetCode 46. Permutations （全排列）

LeetCode 78. Subsets （子集）

LeetCode 22. Generate Parentheses （括号生成）

例子（子集）：

```ts
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
```

# 🟢 7️⃣ BFS（广度优先搜索）

**模式：波纹扩散（多源）**
典型题：

LeetCode 102. Binary Tree Level Order Traversal （层序遍历）

LeetCode 200. Number of Islands （岛屿数量）

LeetCode 752. Open the Lock （最短路径）

例子（层序遍历）：

```ts
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
```

# 🟢 8️⃣ 拓扑图

🔹 阶段 1：基础拓扑排序
题号 标题 练习目标
207 Course Schedule 判断是否有环（能否完成所有课）
210 Course Schedule II 输出一种合法课程顺序（拓扑排序）

🔹 阶段 2：进阶拓扑应用题
题号 标题 练习目标
802 Find Eventual Safe States DAG 上终点状态判定
329 Longest Increasing Path in Matrix DAG 上的记忆化 DFS / DP

🔹 阶段 3：多关键维度的拓扑排序
题号 标题 练习目标
1203 Sort Items by Groups Respecting Dependencies 超复杂拓扑排序（组间 & 组内拓扑）

| 数组模拟结构            | 原理或意义                           | 例子                                                                                          |
| ----------------------- | ------------------------------------ | --------------------------------------------------------------------------------------------- | -------- | -------------------- |
| ✅ 栈（Stack）          | `push` / `pop` 操作尾部，O(1)        | 函数栈还要我说吗                                                                              |
| ✅ 队列（Queue）        | `shift` / `push`，或维护两个指针     | piple，甚至可以是 task 队列                                                                   |
| ✅ 双端队列（Deque）    | `unshift` / `push` / `pop` / `shift` | 固定窗口滑块，单调队列优化，滑窗最大值,vue3 的两棵 VDOM 比较                                  |
| ✅ 堆（Heap）           | 通过父子索引关系模拟完全二叉树       | 最大堆，最小堆算法 O(logn),React Scheduler                                                    |
| ✅ 并查集（Union-Find） | `parent[i]` 记录父节点索引           | 暂无遇到                                                                                      |
| ✅ 树                   | 用索引规律模拟树结构                 | 暂无遇到                                                                                      |
| ✅ 哈希表（开放地址法） | 冲突处理用线性探测                   | 暂无遇到                                                                                      |
| ✅ 滑动窗口（window）   | 维护左右指针在数组上滑动             | 这个和数组我是感觉关系不大                                                                    |
| #                       | 类型                                 | 题目                                                                                          | 难度     | 备注                 |
| -:                      | -----------                          | ----------------------------------------------------------------------------------            | ----     | -------------        |
| 1                       | 🌐 拓扑排序                          | [207. 课程表](https://leetcode.cn/problems/course-schedule/)                                  | ⭐⭐     | 判断能否完成所有课程 |
| 2                       | 🌐 拓扑排序                          | [210. 课程表 II](https://leetcode.cn/problems/course-schedule-ii/)                            | ⭐⭐     | 输出可行的学习顺序   |
| 3                       | 🔍 最短路径 BFS                      | [1091. 二进制矩阵中的最短路径](https://leetcode.cn/problems/shortest-path-in-binary-matrix/)  | ⭐⭐⭐   | 八方向 BFS           |
| 4                       | 🔥 多源 BFS                          | [994. 腐烂的橘子](https://leetcode.cn/problems/rotting-oranges/)                              | ⭐⭐     | 多源 BFS 时间模拟    |
| 5                       | ⛓ 并查集                             | [547. 省份数量](https://leetcode.cn/problems/number-of-provinces/)                            | ⭐⭐     | 图转并查集           |
| 6                       | 🧠 变种最短路径                      | [752. 打开转盘锁](https://leetcode.cn/problems/open-the-lock/)                                | ⭐⭐⭐   | 字符串图，带禁用状态 |
| 7                       | 🔁 环检测                            | [684. 冗余连接](https://leetcode.cn/problems/redundant-connection/)                           | ⭐⭐     | 树中加边，找环       |
| 8                       | 🧠 状态建图                          | [743. 网络延迟时间](https://leetcode.cn/problems/network-delay-time/)                         | ⭐⭐⭐   | Dijkstra 最短路径    |
| 9                       | 🔢 状态压缩图                        | [847. 访问所有节点的最短路径](https://leetcode.cn/problems/shortest-path-visiting-all-nodes/) | ⭐⭐⭐⭐ | 状态压缩 + 图遍历    |
