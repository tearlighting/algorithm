//堆,只是保证了根节点和子节点的大小关系，不在意左右子节点的大小关系
interface IHeap<T> {
  size: number
  peek: T | undefined
  insert(payload: T): void
  //删除堆顶元素并返回
  extractTop(): T | undefined
}

//额外能力，如果以后需要使用plugin啥的，自己扩展去
interface IInjectable<T> {
  injectHeap(payload: T[]): void
}

export class Heap<T> implements IHeap<T>, IInjectable<T> {
  protected _heap: T[] = []
  constructor(private _compare: (a: T, b: T) => boolean) { }
  //问，构建这个heap的复杂度是多少？
  //你就这个算法来说，看上去是n/2 * log(n/2) = nlog(n)
  //但是，你仔细想想，只有root最坏情况下才是logn,越往下越少
  //我就不跟你说什么Σ什么的了，毕竟我高数也忘了。
  //也就是说，比O(nlogn)要少，是O(n)
  injectHeap(payload: T[]): void {
    this._heap = payload
    //只需要操作一半即可
    //什么你问为啥？
    //因为有一半是叶子节点，叶子节点没有子节点，不需要下沉操作
    for (let i = Math.floor(this._heap.length / 2); i >= 0; i--) {
      Heap.sinkDown(this._heap, this._compare, i)
    }
  }
  get size(): number {
    return this._heap.length
  }
  get peek(): T {
    return this._heap[0]
  }
  insert(payload: T): void {
    this._heap.push(payload)
    //往堆中添加元素，为保证完成二叉树，会吧新元素放到最后一个节点，然后进行上浮操作
    Heap.bubbleUp(this._heap, this._compare)
  }
  extractTop(): T | undefined {
    const top = this._heap[0]
    const end = this._heap.pop()
    if (end && this._heap.length) {
      this._heap[0] = end
      //拿走根节点后，为保证完全二叉树，会吧最后一个节点放到根节点，然后进行下沉操作
      Heap.sinkDown(this._heap, this._compare)
    }
    return top
  }
  static sinkDown = sinkDownDfs
  static bubbleUp = bubbleUpDfs
}

function swap<T>(heap: T[], i: number, j: number): void {
  ;[heap[i], heap[j]] = [heap[j], heap[i]]
}
/**
 * 单个节点下沉，最大复杂度是O(logn)
 * @param heap 
 * @param compare 
 * @param index 
 * @returns 
 */
function sinkDownDfs<T>(heap: T[], compare: (a: T, b: T) => boolean, index: number = 0): void {
  if (index > heap.length - 1 || index < 0) return
  let left = 2 * index + 1
  let right = 2 * index + 2
  let largest = index
  if (left < heap.length && compare(heap[largest], heap[left])) {
    largest = left
  }
  if (right < heap.length && compare(heap[largest], heap[right])) {
    largest = right
  }
  if (largest !== index) {
    swap(heap, index, largest)
    sinkDownDfs(heap, compare, largest)
  }
}

function bubbleUpDfs<T>(heap: T[], compare: (a: T, b: T) => boolean, index: number = heap.length - 1): void {
  if (index > heap.length - 1 || index < 0) return
  const parent = Math.floor((index - 1) / 2)
  if (index > 0 && compare(heap[parent], heap[index])) {
    swap(heap, index, parent)
    bubbleUpDfs(heap, compare, parent)
  }
}
