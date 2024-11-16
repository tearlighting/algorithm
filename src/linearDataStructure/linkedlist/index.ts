interface ILinkedList<T> {
  //值
  value: T
  //下一个数据地址(引用空间),非嵌套
  next?: ILinkedList<T> | null
}

class LinkedList<T> implements ILinkedList<T> {
  value: T
  next?: ILinkedList<T> | null = null
  constructor(value: T) {
    this.value = value
  }
  static loopTraversal<T>(link: ILinkedList<T>,callback: (value: T) => void = (v) => console.log(v)) {
    let temp: ILinkedList<T> | null | undefined = link
    while (temp) {
      callback(temp.value)
      temp = temp.next
    }
  }
  static recursionTraversal<T>(link: ILinkedList<T>, callback: (value: T) => void = (v) => console.log(v)) {
    if (!link) return
    callback(link.value)
    link.next && this.recursionTraversal(link.next, callback)
  }
  //逆置链表
  //出口就是最后一个节点
  //其他都是将下一个节点的next指向自己
  //根节点的next指向null
  static reverseLinkedList<T>(link: ILinkedList<T>):ILinkedList<T> {
	 //边界判断
	 if(!link || !link.next){
		return link
	 }
	 if(!link.next.next){
		const last = link.next
		last.next = link
		return last
	 }else{
		try{
			//肯定是从后往前改,在后面改就全乱了
			const res = this.reverseLinkedList(link.next)
			link.next.next = link
			// link.next = null
			return res
		  //只是方便理解我才这样写,本来完全可以写上面
		}finally{
			link.next = null
		}
	 }
  }
  static createInstance<T>(data: T) {
    return new LinkedList<T>(data)
  }
}
const a = new LinkedList(1)
const b = new LinkedList(2)
const c = LinkedList.createInstance(3)
const d = LinkedList.createInstance(4)
a.next = b
b.next = c
c.next = d

//把人逼疯
a.next?.next?.next
// console.log(a);
LinkedList.recursionTraversal(LinkedList.reverseLinkedList(a))

