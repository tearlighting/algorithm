export const candy = (ratings: number[]): number => {
    const candies = Array.from<number>({
        length: ratings.length,
    }).fill(1)
    if (!ratings?.length) return 0
    if (ratings.length === 1) return 1
    //先只看左边的递增区间,递减的还是1不管他
    for (let i = 1; i < ratings.length; i++) {
        if (ratings[i] > ratings[i - 1]) {
            candies[i] = candies[i - 1] + 1;
        }
    }
    //只看反方向的递增区间
    for (let i = ratings.length - 2; i >= 0; i--) {
        if (ratings[i] > ratings[i + 1]) {
            candies[i] = Math.max(candies[i + 1] + 1, candies[i]);
        }
    }
    return candies.reduce((pre, cur) => pre + cur, 0)
}


