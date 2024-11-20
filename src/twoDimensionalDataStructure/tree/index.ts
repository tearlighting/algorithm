interface IBinaryTree<T> {
  value: T
  left: IBinaryTree<T> | null
  right: IBinaryTree<T> | null
}

enum EDiffType {
  change = "change",
  add = "add",
  delete = "delete",
}
interface IBinaryTreeDiffItem {
  type: EDiffType
  newTree: IBinaryTree<any>
  oldTree: IBinaryTree<any>
}

class BinaryTree<T> implements IBinaryTree<T> {
  constructor(public value: T, public left: IBinaryTree<T> = null, public right: IBinaryTree<T> = null) {}
  /**
   * 前序遍历
   * @param tree
   * @param callback
   */
  static preorderTraversal<T>(tree: IBinaryTree<T>, callback?: (data: T) => void) {
    callback && callback(tree.value)
    tree.left && BinaryTree.preorderTraversal(tree.left, callback)
    tree.right && BinaryTree.preorderTraversal(tree.right, callback)
  }
  /**
   * 中序遍历
   * @param tree
   * @param callback
   */
  static inorderTraversal<T>(tree: IBinaryTree<T>, callback?: (data: T) => void) {
    tree.left && BinaryTree.inorderTraversal(tree.left, callback)
    callback && callback(tree.value)
    tree.right && BinaryTree.inorderTraversal(tree.right, callback)
  }
  /**
   * 后序遍历
   * @param tree
   * @param callback
   */
  static postorderTraversal<T>(tree: IBinaryTree<T>, callback?: (data: T) => void) {
    tree.left && BinaryTree.postorderTraversal(tree.left, callback)
    tree.right && BinaryTree.postorderTraversal(tree.right, callback)
    callback && callback(tree.value)
  }
  /**
   * 前+中还原
   * @param preorder
   * @param inorder
   * @returns
   */
  static recoverTreeByPreorderTraversal<T>(preorder: T[], inorder: T[]): IBinaryTree<T> {
    if (preorder.length !== inorder.length) return
    if (!preorder.length || !inorder.length) return
    const root = new BinaryTree(preorder[0])
    if (preorder.length > 1) {
      const index = inorder.indexOf(root.value)
      const inorderLeft = inorder.slice(0, index)
      const inorderRight = inorder.slice(index + 1)
      const preorderLeft = preorder.slice(1, 1 + inorderLeft.length)
      const preorderRight = preorder.slice(1 + inorderLeft.length)
      root.left = BinaryTree.recoverTreeByPreorderTraversal(preorderLeft, inorderLeft)
      root.right = BinaryTree.recoverTreeByPreorderTraversal(preorderRight, inorderRight)
    }
    return root
  }
  /**
   * 后+中还原
   * @param postorder
   * @param inorder
   * @returns
   */
  static recoverTreeByPostorderTraversal<T>(postorder: T[], inorder: T[]): IBinaryTree<T> {
    if (postorder.length !== inorder.length) return
    if (!postorder.length || !inorder.length) return
    const root = new BinaryTree(postorder[postorder.length - 1])
    if (postorder.length > 1) {
      const index = inorder.indexOf(root.value)
      const inorderLeft = inorder.slice(0, index)
      const inorderRight = inorder.slice(index + 1)
      const postorderLeft = postorder.slice(0, inorderLeft.length)
      const postorderRight = postorder.slice(inorderLeft.length, -1)
      root.left = BinaryTree.recoverTreeByPostorderTraversal(postorderLeft, inorderLeft)
      root.right = BinaryTree.recoverTreeByPostorderTraversal(postorderRight, inorderRight)
    }
    return root
  }
  /**
   * 深度优先
   * 类似于前序遍历
   * @param tree
   * @param target
   * @param compare
   * @returns
   */
  static depthFirstSearch<T>(tree: IBinaryTree<T>, target: IBinaryTree<T>, compare = (tree: IBinaryTree<T>, target: IBinaryTree<T>) => tree.value === target.value): boolean {
    if (!tree || !target) return false
    if (compare(tree, target)) return true
    return BinaryTree.depthFirstSearch(tree.left, target, compare) || BinaryTree.depthFirstSearch(tree.right, target, compare)
  }
  /**
   * 广度优先
   * 需要先看同级孩子,所以是一个数组
   * @param tree
   * @param target
   * @param compare
   */
  static breadthFirstSearch<T>(trees: IBinaryTree<T>[], target: IBinaryTree<T>, compare = (tree: IBinaryTree<T>, target: IBinaryTree<T>) => tree.value === target.value): boolean {
    if (!trees || !trees.length || !target) return false
    const children = []
    if (
      trees.some((x) => {
        x.left && children.push(x.left)
        x.right && children.push(x.right)
        return compare(x, target)
      })
    )
      return true
    // console.log(children)
    return BinaryTree.breadthFirstSearch(children, target, compare)
  }
  /**
   * 判断两棵树是否相同
   * @param tree1
   * @param tree2
   * @returns
   */
  static diff1<T>(tree1: IBinaryTree<T>, tree2: IBinaryTree<T>): boolean {
    if (tree1 === tree2) return true
    if ((!tree1 && tree2) || (!tree2 && tree1)) return false
    return tree1.value === tree2.value && BinaryTree.diff1(tree1.left, tree2.left) && BinaryTree.diff1(tree1.right, tree2.right)
  }

  static diff<T>(tree1: IBinaryTree<T>, tree2: IBinaryTree<T>): Array<IBinaryTreeDiffItem> {
    const res: Array<IBinaryTreeDiffItem> = []
    if (tree1 === tree2) return res
    if (tree1 && !tree2) {
      res.push({ type: EDiffType.delete, oldTree: tree1, newTree: tree2 })
    } else if (!tree1 && tree2) {
      res.push({ type: EDiffType.add, oldTree: tree1, newTree: tree2 })
    } else {
      if (tree1.value !== tree2.value) {
        res.push({ type: EDiffType.change, oldTree: tree1, newTree: tree2 })
      }
      res.push(...BinaryTree.diff(tree1.left, tree2.left), ...BinaryTree.diff(tree1.right, tree2.right))
    }
    return res
  }
  /**
   * 二叉搜索树
   * @param arr
   * @returns
   */
  static generateSearchTree<T>(arr: Array<T>) {
    const root = new BinaryTree(arr[0])
    const traversalArr = <T>(arr: T[], index: number, callback: (p: T) => void) => {
      if (arr.length > index) {
        callback(arr[index])
        traversalArr(arr, index + 1, callback)
      }
    }
    traversalArr(arr, 0, (x) => BinaryTree.addSearchTree(x, root))
    return root
  }

  private static addSearchTree<T>(node: T, root: IBinaryTree<T>) {
    if (!root) return
    if (root.value < node) {
      if (!root.right) root.right = new BinaryTree(node)
      else BinaryTree.addSearchTree(node, root.right)
    } else if (root.value > node) {
      if (root.left) BinaryTree.addSearchTree(node, root.left)
      else root.left = new BinaryTree(node)
    }
  }

  static searchSearchTree<T>(tree: IBinaryTree<T>, target: T, res = { res: false, count: 0 }) {
    if (!tree || !target) return res
    if (tree.value === target) {
      res.res = true
    } else {
      res.count++
      if (target > tree.value) {
        return BinaryTree.searchSearchTree(tree.right, target, res)
      } else {
        return BinaryTree.searchSearchTree(tree.left, target, res)
      }
    }
    return res
  }
}

const a = new BinaryTree("a")
const b = new BinaryTree("b")
const c = new BinaryTree("c")
const d = new BinaryTree("d")
const e = new BinaryTree("e")
const f = new BinaryTree("f")
const g = new BinaryTree("g")

a.right = b
a.left = c
c.left = f
c.right = g
b.left = d
b.right = e

const a1 = new BinaryTree("a")
const b1 = new BinaryTree("b1")
const c1 = new BinaryTree("c")
const d1 = new BinaryTree("d")
const e1 = new BinaryTree("e")
const f1 = new BinaryTree("f")
const g1 = new BinaryTree("g")

a1.right = b1
a1.left = c1
c1.left = f1
c1.right = g1
// b1.left = d1
b1.right = e1

const preorderRes = []
const inorderRes = []
const postorderRes = []

// BinaryTree.preorderTraversal(a, Array.prototype.push.bind(preorderRes))
// BinaryTree.inorderTraversal(a, Array.prototype.push.bind(inorderRes))
// BinaryTree.postorderTraversal(a, Array.prototype.push.bind(postorderRes))
// console.log(preorderRes, inorderRes, postorderRes)

// console.log(BinaryTree.recoverTreeByPreorderTraversal(preorderRes, inorderRes), a)
// console.log(BinaryTree.recoverTreeByPostorderTraversal(postorderRes, inorderRes))
// console.log(BinaryTree.depthFirstSearch(a, g))
// console.log(BinaryTree.breadthFirstSearch([a], g))
// console.log(BinaryTree.diff(a,a1));
function generateArr(length: number) {
  const res = new Array<number>(length).fill(0)
  res.forEach((x, i, a) => {
    a[i] = Math.round(Math.random() * 1000)
  })
  return res
}
function searchArr(arr, target) {
  const res = {
    res: false,
    count: 0,
  }
  let i = 0
  for (; i < arr.length; i++) {
    if (arr[i] === target) {
      res.res = true
      res.count = i
      return res
    }
  }
  res.count = i
  return res
}

const arr = generateArr(1000)
const searchTree = BinaryTree.generateSearchTree(arr)

console.log(searchArr(arr, 800), BinaryTree.searchSearchTree(searchTree, 800))

export {}
