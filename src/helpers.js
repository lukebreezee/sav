export { mergeSort };

const mergeHalves = (left, right) => {
    const leftCpy = [...left];
    const rightCpy = [...right];
    const newArr = [];

    while (leftCpy.length && rightCpy.length) {
        let num = leftCpy[0] < rightCpy[0] ? leftCpy.shift() : rightCpy.shift();
        newArr.push(num);
    }

    return [...newArr, ...leftCpy, ...rightCpy];
};

const mergeSort = arr => {
    if (arr.length < 2) {
        return arr;
    }

    const tmp = [...arr];

    const m = (tmp.length - 1) / 2;

    const left = mergeSort(tmp.slice(0, m + 1));
    const right = mergeSort(tmp.slice(m + 1));

    return mergeHalves(left, right);
};