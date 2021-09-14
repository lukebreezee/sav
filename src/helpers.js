import { store } from '.';
export { mergeSort };

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

    store.dispatch({type: 'TIME INDEX SHIFT', operation: '+'});
    setTimeout(() => {
        store.dispatch({
            type: 'ARRAY UPDATE',
            replacement: [...tmp]
        });
        store.dispatch({type: 'TIME INDEX SHIFT', operation: '-'});
    }, store.getState().timeoutIndex * 60);

    return tmp;
};