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
export function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  const { graph, indegrees } = createGraph(numCourses, prerequisites)
  const memory = new Map<number, EVist>()

  for (let i = 0; i < numCourses; i++) {
    if (!dfs(graph, i, memory)) return false
  }
  return bfs(graph, indegrees, numCourses)
}

function dfs(graph: Map<number, number[]>, course: number, memory: Map<number, EVist>): boolean {
  if (memory.get(course) === EVist.visited) return true
  if (memory.get(course) === EVist.visiting) return false
  //进栈设置开始访问
  memory.set(course, EVist.visiting)
  for (let next of graph.get(course) || []) {
    if (!dfs(graph, next, memory)) return false
  }
  //出栈
  memory.set(course, EVist.visited)
  return true
}

function bfs(graph: Map<number, number[]>, indegrees: Map<number, number>, numCourses: number) {
  const queue = [...indegrees.entries()].filter(([, value]) => value === 0).map(([key]) => key)
  let count = 0
  //记忆不需要，indegree就是记忆了
  //   const menory = new Map<number, EVist>()
  while (queue.length) {
    count++
    const course = queue.shift()!
    for (let next of graph.get(course) || []) {
      indegrees.has(next) && indegrees.set(next, indegrees.get(next)! - 1)
      indegrees.get(next) === 0 && queue.push(next)
    }
  }
  //大于说明有环
  //小于说明有断开
  return count === numCourses
}
