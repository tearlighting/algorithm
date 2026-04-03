

export const reconstructQueue = (people: number[][]): number[][] => {
    people.sort((a, b) => {
        if (a[0] === b[0]) {
            //在按前面的人数从小到大
            return a[1] - b[1];
        } else {
            //先按高度从大到小
            return b[0] - a[0];
        }
    })

    const result: number[][] = [];
    for (let i = 0; i < people.length; i++) {
        result.splice(people[i][1], 0, people[i]);
    }
    return result;
}