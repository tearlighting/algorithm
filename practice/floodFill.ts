interface IPoint {
  x: number
  y: number
}
export function floodFill(image: number[][], sr: number, sc: number, color: number): number[][] {
  const start = { x: sr, y: sc }
  const oringinalColor = image[sr][sc]
  oringinalColor !== color && recurseDFS(image, start, color, image[sr][sc])
  // recurseBFS(image, start, color)
  return image
}

function recurseDFS(image: number[][], start: IPoint, color: number, oringinalColor: number) {
  image[start.x][start.y] = color
  const left: IPoint = {
    x: start.x,
    y: start.y - 1,
  }

  const right = {
    x: start.x,
    y: start.y + 1,
  }
  const up = {
    x: start.x - 1,
    y: start.y,
  }
  const down = {
    x: start.x + 1,
    y: start.y,
  }

  left.x >= 0 && left.x < image.length && left.y >= 0 && left.y < image[0].length && image[left.x][left.y] === oringinalColor && recurseDFS(image, left, color, oringinalColor)
  right.x >= 0 && right.x < image.length && right.y >= 0 && right.y < image[0].length && image[right.x][right.y] === oringinalColor && recurseDFS(image, right, color, oringinalColor)
  up.x >= 0 && up.x < image.length && up.y > -0 && up.y < image[0].length && image[up.x][up.y] === oringinalColor && recurseDFS(image, up, color, oringinalColor)
  down.x >= 0 && down.x < image.length && down.y >= 0 && down.y < image[0].length && image[down.x][down.y] === oringinalColor && recurseDFS(image, down, color, oringinalColor)
}

function recurseBFS(image: number[][], start: IPoint, color: number) {
  const queue = [start]
  const oringinalColor = image[start.x][start.y]
  while (queue.length) {
    const current = queue.shift()!
    if (oringinalColor === color) continue
    image[current.x][current.y] = color
    const left: IPoint = {
      x: current.x,
      y: current.y - 1,
    }
    left.x >= 0 && left.x < image.length && left.y >= 0 && left.y < image[0].length && image[left.x][left.y] === oringinalColor && queue.push(left)
    const right = {
      x: current.x,
      y: current.y + 1,
    }
    right.x >= 0 && right.x < image.length && right.y >= 0 && right.y < image[0].length && image[right.x][right.y] === oringinalColor && queue.push(right)
    const up = {
      x: current.x - 1,
      y: current.y,
    }
    up.x >= 0 && up.x < image.length && up.y > -0 && up.y < image[0].length && image[up.x][up.y] === oringinalColor && queue.push(up)
    const down = {
      x: current.x + 1,
      y: current.y,
    }
    down.x >= 0 && down.x < image.length && down.y >= 0 && down.y < image[0].length && image[down.x][down.y] === oringinalColor && queue.push(down)
  }
  return image
}
function dfs(grid: string[][], x: number, y: number, memory: Set<string>) {
  if (!(x >= 0 && x < grid.length && y >= 0 && y < grid[0].length)) return
  if (memory.has(`${x}-${y}`)) return
  if (grid[x][y] === "1") {
    memory.add(`${x}-${y}`)
    dfs(grid, x - 1, y, memory)
    dfs(grid, x + 1, y, memory)
    dfs(grid, x, y - 1, memory)
    dfs(grid, x, y + 1, memory)
  }
}
function numIslands(grid: string[][]): number {
  let res = 0
  const memory = new Set<string>()

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === "1" && !memory.has(`${i}-${j}`)) {
        // dfs(grid, i, j, memory)
        bfs(grid, i, j, memory)
        res++
      }
    }
  }
  return res
}

function bfs(grid: string[][], x: number, y: number, memory: Set<string>) {
  const queue = [{ x, y }]

  while (queue.length) {
    const { x, y } = queue.shift()!
    const key = `${x}-${y}`
    if (memory.has(key)) continue
    memory.add(key)
    if (grid[x][y] === "1") {
      const left = {
        x,
        y: y - 1,
      }
      const right = {
        x,
        y: y + 1,
      }
      const top = {
        x: x - 1,
        y,
      }
      const bottom = {
        x: x + 1,
        y,
      }
      left.x >= 0 && left.x < grid.length && left.y >= 0 && left.y < grid[0].length && grid[left.x][left.y] === "1" && queue.push(left)
      right.x >= 0 && right.x < grid.length && right.y >= 0 && right.y < grid[0].length && grid[right.x][right.y] === "1" && queue.push(right)
      top.x >= 0 && top.x < grid.length && top.y >= 0 && top.y < grid[0].length && grid[top.x][top.y] === "1" && queue.push(top)
      bottom.x >= 0 && bottom.x < grid.length && bottom.y >= 0 && bottom.y < grid[0].length && grid[bottom.x][bottom.y] === "1" && queue.push(bottom)
    }
  }
}
