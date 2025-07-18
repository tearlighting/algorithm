export function maxAreaOfIsland(grid: number[][]): number {
  const memory = new Set<string>()
  let res = 0
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 1) {
        res = Math.max(res, dfs(grid, i, j, memory))
      }
    }
  }
  return res
}
function dfs(grid: number[][], i: number, j: number, memory: Set<string>): number {
  if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] === 0) return 0
  const key = `${i}-${j}`
  if (memory.has(key)) return 0
  memory.add(`${i}-${j}`)
  //这种有分支的，最好使用从后面往回返回的。当然也可以传过去每次自增，只是说每次传递的res都是上一次的结果才行
  const down = dfs(grid, i + 1, j, memory)
  const up = dfs(grid, i - 1, j, memory)
  const right = dfs(grid, i, j + 1, memory)
  const left = dfs(grid, i, j - 1, memory)
  return down + up + right + left + 1
}

function bfs(grid: number[][], i: number, j: number, memory: Set<string>) {
  const queue = [[i, j]]
  let res = 0
  while (queue.length) {
    const [i, j] = queue.shift()!
    if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] === 0) continue
    const key = `${i}-${j}`
    if (memory.has(key)) continue
    memory.add(`${i}-${j}`)
    res++
    queue.push([i + 1, j])
    queue.push([i - 1, j])
    queue.push([i, j + 1])
    queue.push([i, j - 1])
  }
  return res
}
