class ListNode {
  next: ListNode | null
  constructor(public val: number) {}
}
function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  if (l1 && !l2) return l1
  if (l2 && !l1) return l2
  if (!l1 && !l2) return null
  return addTwoListWithCarry(l1, l2)
}

function addTwoListWithCarry(l1: ListNode | null, l2: ListNode | null, carry = 0): ListNode | null {
  if (!l1 && !l2 && carry === 0) return null
  const sum = (l1?.val || 0) + (l2?.val || 0) + carry
  const node = new ListNode(sum % 10)
  carry = Math.floor(sum / 10)
  //深度优先
  node.next = addTwoListWithCarry(l1?.next || null, l2?.next || null, carry)
  return node
}
