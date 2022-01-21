import { normalizeString } from './normalizeStringHelper';

export const possibleCombinations = (str: string) => {
    str = normalizeString(str.toLowerCase());

    const combinations = [];

    const total = str.length;

    // n^2
    for (let i = 0; i < total; i++) {
        for (let j = i + 1; j < total + 1; j++) {
            combinations.push(str.slice(i, j));
        }
    }

    const uniqueCombinations = [...new Set(combinations)];

    return uniqueCombinations;
};

export function possibleAdvancedCombinations(str: string) {
    let lenStr = str.length;

    let result: string[] = [];

    let indexCurrent = 0;

    // n^2
    while (indexCurrent < lenStr) {
        let char = str.charAt(indexCurrent);

        let arrTemp = [char];

        for (let x in result) {
            arrTemp.push('' + result[x] + char);
        }

        result = result.concat(arrTemp);

        indexCurrent++;
    }

    return result;
}
