![Problem](./image.png)

## 思路

这次的单调性就不是mid和left,right的关系了。而是mid与之相邻的元素直接的关系。其实二分法本质还是找到条件去扔一半，
而且我之要可以判断一半有序就行。

```ts
if (arr[mid] < arr[mid + 1]) {
  left = mid + 1
} else {
  right = mid
}
```
