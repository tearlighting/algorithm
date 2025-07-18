function createGraph(numCourses: number, prerequisites: number[][]) {
  //点的关系，当前点后面的其他点
  const graph = new Map<number, number[]>()
  //点与线的关系，指向当前节点的线
  const indegrees = new Map<number, number>()
  for (let i = 0; i < numCourses; i++) {
    indegrees.set(i, 0)
  }
  for (let [course, pre] of prerequisites) {
    !graph.has(pre) && graph.set(pre, [])
    graph.get(pre)!.push(course)
    indegrees.set(course, (indegrees.get(course) || 0) + 1)
  }
  return {
    graph,
    indegrees,
  }
}
enum EVist {
  unvisted,
  visiting,
  visited,
}
function findOrder(numCourses: number, prerequisites: number[][]): number[] {
  const { graph, indegrees } = createGraph(numCourses, prerequisites)
  return bfs(graph, indegrees, numCourses)
  const memory = new Map<number, EVist>()
  const result: number[] = []

  for (let i = 0; i < numCourses; i++) {
    const [res, order] = dfs(graph, i, memory)
    if (!res) return []
    //太强了，假如我开始时不是起点，返回一半，但因为倒叙居然不会有问题，我也是服了
    result.push(...order)
  }

  return result.reverse()
}
function dfs(graph: Map<number, number[]>, course: number, memory: Map<number, EVist>): [boolean, number[]] {
  if (memory.get(course) === EVist.visited) return [true, []]
  //dfs唯一能做的就是判断这种死循环，至于入度为0什么的不要想了，必须把所有的点都走一遍，这就是外层for循环的由来
  if (memory.get(course) === EVist.visiting) return [false, []]
  //进栈设置开始访问
  memory.set(course, EVist.visiting)
  const order = []
  //这里push会乱了顺序，你是有一条路正序完，才会加入另一条路
  // order.push(course)
  for (let next of graph.get(course) || []) {
    const [res, nextorder] = dfs(graph, next, memory)
    if (!res) return [false, nextorder]
    order.push(...nextorder)
  }
  //出栈
  memory.set(course, EVist.visited)
  //逆序加，会使父节点在后，出现共用子节点的时候，就会使父节点往后排，实现同级
  order.push(course)
  return [true, order]
}

function bfs(graph: Map<number, number[]>, indegrees: Map<number, number>, numCourses: number) {
  const queue = [...indegrees.entries()].filter(([, value]) => value === 0).map(([key]) => key)
  let count = 0
  const order = []
  while (queue.length) {
    count++
    const course = queue.shift()!
    order.push(course)
    for (let next of graph.get(course) || []) {
      indegrees.has(next) && indegrees.set(next, indegrees.get(next)! - 1)
      indegrees.get(next) === 0 && queue.push(next)
    }
  }
  if (count === numCourses) return order
  return []
}
