
//
// Selects an option from the provided list based on their weights
//
export function selectOption(options) {
    // Calculate total weight adding the weights from all possible options
    const totalWeight = options.reduce(
        (accumulatedWeight, option) => accumulatedWeight + option.weight, 0);

    // Select a random weight value
    const weight = fxrand() * totalWeight;

    // Loop over the options and return the selected option
    let accumulatedWeight = 0;

    for (const option of options) {
        accumulatedWeight += option.weight;

        if (weight < accumulatedWeight) {
            return option;
        }
    }
}


//
// Splits a given integer amount between different options
//
export function splitAmount(amount, minPerSplit, maxPerSplit, weights) {
    // Create a random distribution from the total amount
    const distribution = [];
    let remainingAmount = amount;

    while (remainingAmount > 0) {
        const value = Math.min(Math.max(minPerSplit, Math.floor(fxrand() * remainingAmount)), maxPerSplit);
        distribution.push(value);
        remainingAmount -= value;
    }

    // Calculate total weight adding the weights from all possible options
    const totalWeight = weights.reduce(
        (accumulatedWeight, weight) => accumulatedWeight + weight, 0);

    // Assign the distribution amounts to the different options
    const optionAmounts = new Array(weights.length).fill(0);

    for (const value of distribution) {
        // Select a random weight value
        const weight = fxrand() * totalWeight;

        // Loop over the weights and add the distribution amount to the correct option
        let accumulatedWeight = 0;

        for (let i = 0; i < weights.length; i += 1) {
            accumulatedWeight += weights[i];

            if (weight < accumulatedWeight) {
                optionAmounts[i] += value;
                break;
            }
        }
    }

    return optionAmounts;
}
