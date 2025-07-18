export function updateMatrix(mat: number[][]): number[][] {
  // const memory = new Set<string>()
  const res = mat.map(() => new Array(mat[0].length).fill(Infinity))
  const checkPointValid = ([x, y]: [number, number]) => x >= 0 && x < mat.length && y >= 0 && y < mat[0].length
  // for (let i = 0; i < mat.length; i++) {
  //   for (let j = 0; j < mat[i].length; j++) {
  //     //你会发现一个问题，那就是每次1都要从头开始BFS，虽然确实比dfs要快，但你会发现会重复很多.那你想想，可不可以从0开始，只更新四周呢
  //     // if (mat[i][j] === 1) {
  //     //   res[i][j] = bfs(mat, i, j)
  //     // }
  //     //但这样是只能更新0的四周，当距离大于1就炸了，这时候就需要新的思想，可不可以先更新0的周围，在更新1的周围，时间复杂度是O(m*n)
  //     // if (mat[i][j] === 0) {
  //     //   res[i][j] = 0
  //     //   const left = [i, j - 1]
  //     //   const right = [i, j + 1]
  //     //   const top = [i - 1, j]
  //     //   const bottom = [i + 1, j]
  //     //   for (const [x, y] of [left, right, top, bottom]) {
  //     //     if (checkPointValid([x, y])) {
  //     //       res[x][y] = Math.min(res[x][y], res[i][j] + 1)
  //     //     }
  //     //   }
  //     // }
  //   }
  // }
  //多源广度优先搜索
  //init
  const queue: [number, number][] = []
  for (let i = 0; i < mat.length; i++) {
    for (let j = 0; j < mat[0].length; j++) {
      if (mat[i][j] === 0) {
        res[i][j] = 0
        //先把0的坐标放到队列里
        queue.push([i, j])
      }
    }
  }
  while (queue.length) {
    const [i, j] = queue.shift() as [number, number]
    const left = [i, j - 1]
    const right = [i, j + 1]
    const top = [i - 1, j]
    const bottom = [i + 1, j]
    for (const [x, y] of [left, right, top, bottom]) {
      if (checkPointValid([x, y])) {
        //只更新周围的坐标，先更新0，然后把所有的1都放进队列。依次类推
        if (res[x][y] > res[i][j] + 1) {
          res[x][y] = res[i][j] + 1
          queue.push([x, y])
        }
      }
    }
  }
  return res
}
function bfs(mat: number[][], i: number, j: number) {
  const queue = [[i, j]]
  let res = 0
  while (queue.length) {
    const [i, j] = queue.shift() as number[]
    if (mat[i][j] === 0) break
    queue.push([i - 1, j])
    queue.push([i + 1, j])
    queue.push([i, j - 1])
    queue.push([i, j + 1])
    res++
  }
  return res
}
