import { store } from '.';
import { actionCreator, numsSplice } from './action-creators';
export { mergeSort };

/* const mergeSort = (arr, l, r) => {
    if (r - l < 1) {
        return arr.slice(l, r + 1);
    }

    const m = Math.floor(l + (r - l) / 2);
    
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);

    const mergedArray = [];
    const left = arr.slice(l, m + 1);
    const right = arr.slice(m + 1, r + 1);

    while (left.length && right.length) {
        let num = left[0] < right[0] ? left.shift() : right.shift();
        mergedArray.push(num);
    }

    let newArr = [...mergedArray, ...left, ...right];

    store.dispatch(numsSplice('MERGE COPY', l, newArr.length, ...newArr));
}; */

const mergeSort = (arr, l, r) => {
    let tmp = [...arr];

    if (r - l < 1) {
        return tmp;
    }

    const m = Math.floor(l + (r - l) / 2);

    tmp = mergeSort(tmp, l, m);
    tmp = mergeSort(tmp, m + 1, r);

    const left = tmp.slice(l, m + 1);
    const right = tmp.slice(m + 1, r + 1);
    let mergedArray = [];
    let num;

    while (left.length && right.length) {
        if (left[0] < right[0]) {
            num = left.shift();
        } else {
            num = right.shift();
        }

        mergedArray.push(num);

        /*tmp = [
            ...tmp.slice(0, l),
            ...mergedArray,
            ...left,
            ...right,
            ...tmp.slice(r + 1)
        ]

        store.dispatch({
            type: 'ARRAY UPDATE',
            replacement: [...tmp]
        });*/
    }

    tmp = [
        ...tmp.slice(0, l),
        ...mergedArray,
        ...left,
        ...right,
        ...tmp.slice(r + 1)
    ];



    return tmp;
    /*
    store.dispatch({
        type: 'ARRAY UPDATE',
        replacement: [...tmp]
    });*/
}