export const maxArea = function (height: number[]) {
    if (!height?.length) return 0
    return recurse(height)
}

const recurse = (height: number[], left: number = 0, right: number = height.length - 1, max: number = 0) => {
    if (left >= right) return max
    const area = computeArea(height, left, right)
    //保留大的即可
    if (height[left] < height[right]) {
        return recurse(height, left + 1, right, Math.max(max, area))
    } else {
        return recurse(height, left, right - 1, Math.max(max, area))
    }
}

const computeArea = (height: number[], left: number, right: number) => {
    const width = right - left
    const heightVal = Math.min(height[left], height[right])
    return width * heightVal
}