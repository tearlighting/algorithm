export function shipWithinDays(weights: number[], days: number): number {
    if (!weights?.length) return -1
    if (weights.length === 1) return weights[0]

    let left = Math.max(...weights)
    let right = weights.reduce((a, b) => a + b, 0)

    while (left < right) {
        const mid = Math.floor((left + right) / 2)
        if (canShip(weights, mid, days)) {
            right = mid
        } else {
            left = mid + 1
        }
    }
    return left
};

/**
 * 贪心
 * @param weights 
 * @param capacity 
 * @param days 
 * @returns 
 */
function canShip(weights: number[], capacity: number, days: number): boolean {
    let needDays = 1
    let sum = 0
    for (let i = 0; i < weights.length; i++) {
        if (sum + weights[i] > capacity) {
            needDays++
            sum = weights[i]
        } else {
            sum += weights[i]
        }
    }
    return needDays <= days
}