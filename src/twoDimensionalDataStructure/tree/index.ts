interface IBinaryTree<T> {
  value: T
  left: IBinaryTree<T> | null
  right: IBinaryTree<T> | null
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
    console.log(children)

    return BinaryTree.breadthFirstSearch(children, target, compare)
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

const preorderRes = []
const inorderRes = []
const postorderRes = []

// BinaryTree.preorderTraversal(a, Array.prototype.push.bind(preorderRes))
// BinaryTree.inorderTraversal(a, Array.prototype.push.bind(inorderRes))
// BinaryTree.postorderTraversal(a, Array.prototype.push.bind(postorderRes))
// console.log(preorderRes, inorderRes, postorderRes)

// console.log(BinaryTree.recoverTreeByPreorderTraversal(preorderRes, inorderRes), a)
// console.log(BinaryTree.recoverTreeByPostorderTraversal(postorderRes, inorderRes))
console.log(BinaryTree.depthFirstSearch(a, g))
console.log(BinaryTree.breadthFirstSearch([a], g))
export {}
