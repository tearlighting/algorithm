import { Heap } from "./utils/MaxHeap"
function scheduleCourse(courses: number[][]): number {
  // 按照结束时间排序
  courses.sort((a, b) => a[1] - b[1])
  const maxHeap = new Heap<number>((a, b) => a < b)
  let sum = 0
  for (let [time, expire] of courses) {
    // 如果当前课程可以安排，则安排
    if (sum + time <= expire) {
      sum += time
      maxHeap.insert(time)
    } else {
      // 如果当前课程不能安排，则看是否需要替换掉一个时间最长的课程
      if (maxHeap.size && maxHeap.peek > time) {
        sum += time - maxHeap.extractTop()!
        maxHeap.insert(time)
      }
    }
  }
  return maxHeap.size
}
