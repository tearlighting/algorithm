const arr = new Array(10)
const arr2 = [4, 5, 2, 3, 1, 9, 7, 6, 8]
const arr3 = [4, 1, 2, 5, 3, 9, 7, 6, 8]
class ArraySortHelper {
  /**
   * 交换
   * @param arr
   * @param index1
   * @param index2
   */
  private static exchange<T>(arr: T[], index1: number, index2: number) {
    const temp = arr[index1]
    arr[index1] = arr[index2]
    arr[index2] = temp
  }
  /**
   * 默认比较方法,特别是Array<number>,压根不想写
   * @param item1
   * @param item2
   * @returns
   */
  private static compare<T>(item1: T, item2: T) {
    return item1 > item2
  }

  private static vaildateArr<T>(arr: T[]) {
    return arr && arr.length
  }
  /**
   * 冒泡排序 大的或小的沉底
   * 越有序越适合冒泡
   * @param arr
   * @param compare
   * @returns
   */
  static bubbleSort<T>(arr: T[], compare = ArraySortHelper.compare<T>) {
    if (!ArraySortHelper.vaildateArr(arr)) return []
    for (let j = 0; j < arr.length - 1; j++) {
      for (let i = 0; i < arr.length - 1 - j; i++) {
        compare(arr[i], arr[i + 1]) && ArraySortHelper.exchange(arr, i, i + 1)
      }
    }
    return arr
  }
  /**
   * 选择排序，每次循环记录一个需要交换的index(最大或最小)，最后交换
   * 适中
   * @param arr
   * @param compare
   * @returns
   */
  static selectionSort<T>(arr: T[], compare = ArraySortHelper.compare<T>) {
    if (!ArraySortHelper.vaildateArr(arr)) return []
    for (let j = 0; j < arr.length - 1; j++) {
      let exchangeIndex = 0
      for (let i = 0; i < arr.length - 1 - j; i++) {
        compare(arr[exchangeIndex], arr[i + 1]) && (() => (exchangeIndex = i + 1))()
      }
      ArraySortHelper.exchange(arr, exchangeIndex, arr.length - 1 - j)
    }
    return arr
  }
  /**
   * 快速排序 易理解版,缺点创建过多数组。大于头的放右边，小于头的放左边
   * @param arr
   * @param compare
   */
  static quickSortEasy<T>(arr: T[], compare = ArraySortHelper.compare<T>): T[] {
    if (!ArraySortHelper.vaildateArr(arr)) return []
    if (arr.length < 2) {
      return arr
    }
    const begin = 0
    const left: T[] = []
    const right: T[] = []

    for (let i = 0; i < arr.length; i++) {
      if (begin === i) {
        continue
      }
      compare(arr[begin], arr[i]) ? left.push(arr[i]) : right.push(arr[i])
    }
    return [...ArraySortHelper.quickSortEasy(left, compare), arr[begin], ...ArraySortHelper.quickSortEasy(right, compare)]
  }
  /**
   * 快速排序  使用两个指针
   */
  static quickSortPoint<T>(arr: T[], compare = ArraySortHelper.compare<T>): T[] {
    console.log(compare.toString())

    if (!ArraySortHelper.vaildateArr(arr)) return []
    if (arr.length < 2) {
      return arr
    } else if (arr.length === 2) {
      compare(arr[0], arr[1]) && ArraySortHelper.exchange(arr, 0, 1)
      return arr
    }
    let left = 1
    let right = arr.length - 1
    while (left < right) {
      while (compare(arr[0], arr[left]) && left < right) {
        left++
      }
      while (!compare(arr[0], arr[right]) && left < right) {
        right--
      }
      if (left < right) {
        ArraySortHelper.exchange(arr, left, right)
      }
    }
    const exchangePosition = compare(arr[0], arr[right]) ? right : right - 1
    ArraySortHelper.exchange(arr, 0, exchangePosition)
    // console.log(arr, left, right)
    return [...ArraySortHelper.quickSortPoint(arr.slice(0, exchangePosition), compare), arr[exchangePosition], ...ArraySortHelper.quickSortPoint(arr.slice(exchangePosition + 1), compare)]
  }
}

interface Array<T> {
  /**
   * 冒泡排序
   * @param this
   * @param compare
   */
  bubbleSort<T>(this: T[], compare?: (item1: T, item2: T) => boolean): T[]
  /**
   * 选择排序
   * @param this
   * @param compare
   */
  selectionSort<T>(this: T[], compare?: (item1: T, item2: T) => boolean): T[]
}

Reflect.setPrototypeOf(Array.prototype, {
  bubbleSort: function <T>(this: T[], compare?: (item1: T, item2: T) => boolean) {
    return ArraySortHelper.bubbleSort<T>(this, compare)
  },
  selectionSort<T>(this: T[], compare?: (item1: T, item2: T) => boolean) {
    return ArraySortHelper.selectionSort(this, compare)
  },
})

// arr2.bubbleSort().forEach((v) => console.log(v))
// arr2.selectionSort((x, y) => x < y).forEach((v) => console.log(v))
console.log(ArraySortHelper.quickSortPoint(arr3, (x, y) => x < y))
