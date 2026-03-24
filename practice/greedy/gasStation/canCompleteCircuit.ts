export const canCompleteCircuit = (gas: number[], cost: number[]): number => {

    let totalGas = 0;
    let tank = 0;
    let startingStation = 0;

    for (let i = 0; i < gas.length; i++) {
        totalGas += gas[i] - cost[i];
        tank += gas[i] - cost[i];

        if (tank < 0) {
            startingStation = i + 1;
            tank = 0;
        }
    }

    return totalGas >= 0 ? startingStation : -1;

}