import { normalizeString } from '../../../shared/helpers/normalizeStringHelper';

export const generateStringCombinatios = (str: string) => {
    str = normalizeString(str);

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

export function generateStringCombinatiosAdvanced(str: string) {
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
