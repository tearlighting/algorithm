const arr = new Array(10)
const arr2 = [4, 5, 2, 3, 1, 9, 7, 6, 8]
const arr3 = [4, 1, 2, 5, 3, 9, 7, 6, 8]

interface IQuickSortConfig{
	/**
	 * 左指针位置
	 */
	left: number
	/**
	 * 右指针位置
	 */
	right: number
	/**
	 * 比较基准位置
	 */
	basic: number
    /**
	 * 排序数组的开始位置 可以取到
	 */
	begin: number
	/**
	 * 排序数组的结束位置 取不到
	 */
	end: number
}

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
   * 快速排序  使用两个指针,但是有你还是创建了新的数组
   */
  static quickSortPoint<T>(arr: T[], compare = ArraySortHelper.compare<T>): T[] {
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
    return [...ArraySortHelper.quickSortPoint(arr.slice(0, exchangePosition), compare), arr[exchangePosition], ...ArraySortHelper.quickSortPoint(arr.slice(exchangePosition + 1), compare)]
  }
  /**
   * 快速排序正式版 
   * 左闭右开[0,arr.length)
   * @param arr 
   * @param compare 
   * @param begin [
   * @param end )
   */
  static quickSort<T>(arr:T[], compare = ArraySortHelper.compare<T>,begin = 0, end = arr.length):T[]{
	   if(!ArraySortHelper.vaildateArr(arr)) return []

	   ArraySortHelper.quickSortLogic(arr,compare,{left:begin+1,right:end-1,basic:begin,begin,end})
	   return arr
  }

  private static quickSortLogic<T>(arr:T[], compare = ArraySortHelper.compare<T>,config:IQuickSortConfig){
	if(config.left>config.right) return
	//只有两个数据
	if(config.left===config.right){
        compare(arr[config.basic],arr[config.right]) && ArraySortHelper.exchange(arr,config.basic,config.right)
	}
	ArraySortHelper.quickSortLeftPointIncrease(arr,compare,config)
	ArraySortHelper.quickSortRightPointDeCrease(arr,compare,config)
	if(config.left<config.right){
		ArraySortHelper.exchange(arr,config.left,config.right)
		ArraySortHelper.quickSortLogic(arr,compare,config)
	 }else{
		const exchangePosition = compare(arr[config.basic], arr[config.right]) ? config.right : config.right - 1
		ArraySortHelper.exchange(arr, config.basic, exchangePosition)
		ArraySortHelper.quickSortLogic(arr,compare,{left:config.begin+1,right:exchangePosition-1,basic:config.begin,begin:config.begin,end:exchangePosition})
		ArraySortHelper.quickSortLogic(arr,compare,{left:exchangePosition+2,right:config.end-1,basic:exchangePosition+1,begin:exchangePosition+1,end:config.end})
	 }
  }

  /**
   * 左指针移动到第一个满足条件
   * @param arr 
   * @param compare 
   * @param begin 
   * @returns 左指针位置
   */
  private static  quickSortLeftPointIncrease<T>(arr:T[],compare = ArraySortHelper.compare<T>,config:IQuickSortConfig ): number{
	 if(compare(arr[config.basic],arr[config.left]) && config.left< config.right  ){
		config.left++
	    return ArraySortHelper.quickSortLeftPointIncrease(arr,compare,config)
	 }
  }
    /**
   * 右指针移动到第一个不满足条件
   * @param arr 
   * @param compare 
   * @param begin 
   * @returns 右指针位置
   */
  private static  quickSortRightPointDeCrease<T>(arr:T[],compare = ArraySortHelper.compare<T>, config:IQuickSortConfig):number{
	 if(!compare(arr[config.basic],arr[config.right]) && config.left < config.right ){
		config.right--	
		return ArraySortHelper.quickSortRightPointDeCrease(arr,compare,config)
	 }
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
  /**
   * 快速排序
   * @param this 
   * @param compare 
   */
  quickSort<T>(this: T[], compare?: (item1: T, item2: T) => boolean): T[]

}

Reflect.setPrototypeOf(Array.prototype, {
  bubbleSort: function <T>(this: T[], compare?: (item1: T, item2: T) => boolean) {
    return ArraySortHelper.bubbleSort<T>(this, compare)
  },
  selectionSort<T>(this: T[], compare?: (item1: T, item2: T) => boolean) {
    return ArraySortHelper.selectionSort(this, compare)
  },
  quickSort<T>(this:T[],compare?: (item1: T, item2: T) => boolean){
	return ArraySortHelper.quickSort(this,compare)
  }
  
})

// arr2.bubbleSort().forEach((v) => console.log(v))
// arr2.selectionSort((x, y) => x < y).forEach((v) => console.log(v))
// console.log(ArraySortHelper.quickSort(arr3,(x,y)=>x<y))

// arr2.quickSort((x,y)=>x<y).forEach(e=>console.log(e))
