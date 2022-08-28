import _ from "lodash";

const genDiff = (obj1, obj2) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    const sortedKeys = _.sortBy(_.union(keys1, keys2));

    let result = '{';

    for (const key of sortedKeys) {
        if (!Object.hasOwn(obj1, key)) {
            result = `${result}\n + ${key}: ${obj2[key]}`;
        } else if (!Object.hasOwn(obj2, key)) {
            result = `${result}\n - ${key}: ${obj1[key]}`;
        } else if (obj1[key] === obj2[key]) {
            result = `${result}\n   ${key}: ${obj1[key]}`;
        } else {
            result = `${result}\n - ${key}: ${obj1[key]}\n + ${key}: ${obj2[key]}`;
        }
    }

    return `${result}\n}`;
};

export default genDiff;
