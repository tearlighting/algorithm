const generateKey = (x: number, y: number) => `${x}-${y}`
export function closedIsland(grid: number[][]): number {
  const x = grid.length
  const y = grid[0].length
  const memory = new Map<string, boolean>()
  let res = 0
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      if (grid[i][j] === 0 && !memory.has(generateKey(i, j)) && dfs(grid, i, j, memory)) {
        res++
      }
    }
  }
  return res
}

function dfs(grid: number[][], x: number, y: number, memory: Map<string, boolean>): boolean {
  if (x < 0 || x >= grid.length || y < 0 || y >= grid[0].length) return false
  if (grid[x][y] === 1) return true
  //这里用Set你也不知道要返回什么，使用决定使用Map
  if (memory.has(generateKey(x, y))) return memory.get(generateKey(x, y))!
  //这里先假定可以访问，这样之后进来的都会直接返回true,只等打一次的结果拿到之后，才能决定真正的结果，要不然你四个递归很有可能每次都要执行一遍
  memory.set(generateKey(x, y), true)
  const up = dfs(grid, x - 1, y, memory)
  const down = dfs(grid, x + 1, y, memory)
  const left = dfs(grid, x, y - 1, memory)
  const right = dfs(grid, x, y + 1, memory)
  const res = up && down && left && right
  memory.set(generateKey(x, y), res)
  return res
}

function bfs(grid: number[][], x: number, y: number, memory: Map<string, boolean>) {
  const queue = [[x, y]]
  let res = true
  const memo = new Set<string>()
  while (queue.length) {
    const [x, y] = queue.shift()!

    if (memory.has(generateKey(x, y))) {
      if (memory.get(generateKey(x, y))) {
        continue
      } else {
        res = false
        break
      }
    }

    const left = [x, y - 1]
    const right = [x, y + 1]
    const up = [x - 1, y]
    const down = [x + 1, y]
    for (let [i, j] of [left, right, up, down]) {
      if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length) {
        res = false
        break
      } else {
        if (grid[i][j] === 0) {
          queue.push([i, j])
          memo.add(generateKey(i, j))
        }
      }
    }
  }
  for (let key of memo) {
    memory.set(key, res)
  }
  return res
}
