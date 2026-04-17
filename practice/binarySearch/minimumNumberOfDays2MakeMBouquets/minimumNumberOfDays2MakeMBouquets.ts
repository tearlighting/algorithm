export function minDays(bloomDay: number[], m: number, k: number): number {
    if (!bloomDay?.length || m * k > bloomDay.length) return -1;

    let left = Math.min(...bloomDay);
    let right = Math.max(...bloomDay);

    while (left < right) {
        let mid = Math.floor((left + right) / 2);


        if (canMakeBouquets(bloomDay, m, k, mid)) {
            right = mid;
        } else {
            left = mid + 1;
        }

    }
    return left
};

const canMakeBouquets = (bloomDay: number[], m: number, k: number, day: number) => {

    let count = 0;
    let bouquet = 0;
    for (let i = 0; i < bloomDay.length; i++) {
        //sum
        if (bloomDay[i] <= day) {
            count++
        } else {
            count = 0
        }
        //一束花
        if (count >= k) {
            count = 0
            bouquet++
        }
    }
    return bouquet >= m
}