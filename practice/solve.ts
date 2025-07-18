export function solve(board: string[][]): void {
  const x = board.length
  const y = board[0].length

  const memory = new Set<string>()
  //上下边界
  for (let j = 0; j < y; j++) {
    board[0][j] === "O" && !memory.has(`${0},${j}`) && dfs(board, 0, j, memory)
    board[x - 1][j] === "O" && !memory.has(`${x - 1},${j}`) && dfs(board, x - 1, j, memory)
  }

  //左右边界
  for (let i = 1; i < x; i++) {
    board[i][0] === "O" && !memory.has(`${i},${0}`) && dfs(board, i, 0, memory)
    board[i][y - 1] === "O" && !memory.has(`${i},${y - 1}`) && dfs(board, i, y - 1, memory)
  }
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      if (board[i][j] === "O" && !memory.has(`${i},${j}`)) {
        board[i][j] = "X"
      }
    }
  }
}
function isValid(i: number, j: number, board: string[][]) {
  const x = board.length
  const y = board[0].length
  return i >= 0 && i < x && j >= 0 && j < y
}
function dfs(board: string[][], x: number, y: number, memory: Set<string>) {
  if (!isValid(x, y, board) || memory.has(`${x},${y}`) || board[x][y] === "X") return
  memory.add(`${x},${y}`)
  dfs(board, x + 1, y, memory)
  dfs(board, x - 1, y, memory)
  dfs(board, x, y + 1, memory)
  dfs(board, x, y - 1, memory)
}

function bfs(board: string[][], x: number, y: number, memory: Set<string>) {
  const queue: [number, number][] = [[x, y]]
  while (queue.length) {
    const [x, y] = queue.shift()!
    if (!isValid(x, y, board) || memory.has(`${x},${y}`) || board[x][y] === "X") continue
    memory.add(`${x},${y}`)
    queue.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1])
  }
}

solve([["X"]])
function shortestPathBinaryMatrix(grid: number[][]) {
  if (grid[0][0] === 1 || grid[grid.length - 1][grid[0].length - 1] === 1) return -1
  const queue = [[0, 0]]

  while (queue.length) {
    const current = queue.shift()!
    const step = grid[current[0]][current[1]]
    if (current[0] === grid.length - 1 && current[1] === grid[0].length - 1) return step + 1
    for (const [x, y] of [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ]) {
      const [i, j] = [current[0] + x, current[1] + y]
      if (i >= 0 && i < grid.length && j >= 0 && j < grid[0].length && grid[i][j] === 0) {
        queue.push([i, j])
        grid[i][j] = step + 1
      }
    }
  }
  return -1
}

function orangesRotting(grid: number[][]): number {
  const x = grid.length
  const y = grid[0].length
  const queue: [number, number][] = []
  //init queue
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      if (grid[i][j] === 2) {
        queue.push([i, j])
      }
    }
  }
  while (queue.length) {
    let wave = queue.length
    while (wave--) {
      const [x, y] = queue.shift()!
      const step = grid[x][y]
      for (const [i, j] of [
        [-1, 0],
        [0, -1],
        [0, 1],
        [1, 0],
      ]) {
        const [nx, ny] = [x + i, y + j]
        if (nx >= 0 && nx < x && ny >= 0 && ny < y && grid[nx][ny] === 1) {
          grid[nx][ny] = 2
          queue.push([nx, ny])
        }
      }
    }
  }
  let res = 0
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      if (grid[i][j] === 1) return -1
      res = Math.max(res, grid[i][j])
    }
  }
  return res
}
