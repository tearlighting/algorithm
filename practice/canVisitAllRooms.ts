export function canVisitAllRooms(rooms: number[][]): boolean {
  const visited = new Set<number>()
  dfs(rooms, 0, visited)
  return visited.size === rooms.length
}

function dfs(rooms: number[][], currentRoom: number, visited: Set<number>): void {
  if (visited.has(currentRoom)) return
  visited.add(currentRoom)
  const availableRooms = rooms[currentRoom]
  for (const room of availableRooms) {
    dfs(rooms, room, visited)
  }
}

function bfs(rooms: number[][], currentRoom: number, visited: Set<number>) {
  const queue = [currentRoom]
  while (queue.length) {
    const current = queue.shift()!
    if (visited.has(current)) continue
    visited.add(current)
    if (visited.size === rooms.length) break
    const availableRooms = rooms[current]
    for (const room of availableRooms) {
      queue.push(room)
    }
  }
}
