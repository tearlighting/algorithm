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
   (js 引擎虽然会自动扩容，但是消耗性能。比如一个长度为 8 的数组需要扩容，先向系统申请一个可能是 16 长度内存，然后将之前的 8 个给复制过来，在塞进去 9)
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
2. 添加删除容易。删除直接改 next 引用,添加也是

缺点:

1. 查询速度慢
2. next 引用浪费空间。数据越多，影响越少

```ts
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
  static createInstance<T>(data: T) {
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

### [extends] 双向链表 没用特殊算法

优点: 无论给出哪一个节点都可以遍历整个链表
缺点: 多耗费一个引用空间，构建复杂，且双向链表能做的事情，链表都能做

### stack

后进先出

### queue

先进先出

## 二维数据结构 Two-dimensional data

### 二维数组 [[],[]]

### 二维拓扑结构(图) topology 链表进化而来

只看关系,不看位置大小

#### 树形结构 tree 有向无环图

特点

1. 单根
2. 没用回路

概念:
根节点: 最外层
叶子节点: 最下层
节点: 既不是根节点也不是叶子节点的普通节点
度: 最多叉的节点的节点数
深度:层数

##### 二叉树 binary tree 度<=2

1. 满二叉树

所有叶子节点都在最底层
非叶子节点都有 2 个子节点

2. 完全二叉树

叶子节点都在最后两层
如果有节点不需要是两个
叶子节点向左靠拢

3. 前序、中序、后序遍历

见代码

4. 根据前序/后序+中序还原二叉树

见代码

5. 深度优先和广度优先

深度适合探索未知 前序遍历
广度适合探索局域

6. 最小生成树问题

1) prim 找最近的点
2) kruskal 找最小边

7. 二叉搜索树
   **假如从 1 万个数中搜索 1 个数**
   ```ts
     { res: true, count: 619 } { res: true, count: 14 }
   ```
8. 平衡二叉树

虽然二叉搜索树的性能高了很多，但还是可以优化。
如果可以使二叉搜索树向满二叉树靠拢，效率会更高

1. 左右子树的高度差<=1
2. 子树也满足
