# 数据结构与算法 data structure and algorithms

1. 数据结构

容纳数据的结构 **静态**

2. 算法

数据结构的处理方法**动态**

## 线性数据结构 linear structure

**强调存储与顺序**

### array
1. 物理空间上是连续的
2. 数组定长
(js引擎虽然会自动扩容，但是消耗性能。比如一个长度为8的数组需要扩容，先向系统申请一个可能是16长度内存，然后将之前的8个给复制过来，在塞进去9)
3. 数组变量指向数组的起点 
[1],[2]这些是偏移，通过偏移查询性能好

优点:
查询性能好
缺点:
1. 空间必须连续，系统空间碎片比较多时，可能存不下。避免大数组。(建议学习操作系统)
2. 长度固定, 内容难以添加、删除

#### 数组的排序

排序的本质: **比较和交换**
1. 冒泡排序
大的或小的一次一次沉底


### 链表 linked list
想传递一个链表，必须传递子节点
**每一个节点都认为自己是根节点(不知道前面有什么)**

1. 物理空间不连续
2. 存放值会多开销一个引用空间

优点:
1. 只要内存足够大，就能存的下。
2. 添加删除容易。删除直接改next引用,添加也是

缺点:
1. 查询速度慢
2. next引用浪费空间。数据越多，影响越少

```ts
interface ILinkedList<T>{
   //值
   value:T
   //下一个数据地址(引用空间),非嵌套
   next?:ILinkedList<T>|null
}

class LinkedList<T> implements ILinkedList<T>{
	value: T
	next?: ILinkedList<T>|null = null
    constructor(value: T){
		this.value = value
	}
	static createInstance<T>(data:T){
		return new LinkedList<T>(data)
	}
}
const a = new LinkedList(1)
const b = new LinkedList(2)
const c = LinkedList.createInstance(3)

a.next = b
b.next = c

//把人逼疯
a.next?.next?.next 

// 如何遍历(Traversal)
```