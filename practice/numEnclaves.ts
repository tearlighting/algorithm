const generateKey = (x: number, y: number) => `${x}-${y}`
const isValid = (x: number, y: number, grid: number[][]) => x >= 0 && x < grid.length && y >= 0 && y < grid[0].length
export function numEnclaves(grid: number[][]): number {
  const x = grid.length
  const y = grid[0].length
  const memory = new Set<string>()
  //上下边界
  for (let j = 0; j < y; j++) {
    grid[0][j] === 1 && !memory.has(generateKey(0, j)) && dfs(grid, 0, j, memory)
    grid[x - 1][j] === 1 && !memory.has(generateKey(x - 1, j)) && dfs(grid, x - 1, j, memory)
  }
  //左右
  for (let i = 1; i < x - 1; i++) {
    grid[i][0] === 1 && !memory.has(generateKey(i, 0)) && dfs(grid, i, 0, memory)
    grid[i][y - 1] === 1 && !memory.has(generateKey(i, y - 1)) && dfs(grid, i, y - 1, memory)
  }

  let res = 0

  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      if (grid[i][j] === 1 && !memory.has(generateKey(i, j))) {
        res++
      }
    }
  }
  return res
}

function dfs(grid: number[][], i: number, j: number, memory: Set<string>) {
  if (!isValid(i, j, grid) || memory.has(generateKey(i, j)) || grid[i][j] === 0) return
  memory.add(generateKey(i, j))
  dfs(grid, i + 1, j, memory)
  dfs(grid, i - 1, j, memory)
  dfs(grid, i, j + 1, memory)
  dfs(grid, i, j - 1, memory)
}

function bfs(grid: number[][], i: number, j: number, memory: Set<string>) {
  const queue = [[i, j]]
  while (queue.length) {
    const [x, y] = queue.shift()!
    if (!isValid(x, y, grid) || memory.has(generateKey(x, y)) || grid[x][y] === 0) continue
    memory.add(generateKey(x, y))
    queue.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1])
  }
}
