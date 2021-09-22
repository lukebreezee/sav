//This file contains our sorting functions and helpers for those functions

import { store } from '.';
export { mergeSort, quickSort, selectionSort };

/* Merge sort with bounds of a single array (no copies created).
 * arr is the source array, l is the leftmost index of our subarray,
 * r is the rightmost index of our subarray.
 */

const mergeSort = (arr, l, r) => {
    //We create a temporary copy of our array to avoid mutation
    let tmp = [...arr];

    //If the subarray is of size 1, it is sorted, so we return tmp
    if (r - l < 1) {
        return tmp;
    }

    //If subarray size is > 1...

    //We find our middle index
    const m = Math.floor(l + (r - l) / 2);

    //Sort left half
    tmp = mergeSort(tmp, l, m);

    //Sort right half
    tmp = mergeSort(tmp, m + 1, r);


    //Merge sorted halves...


    //Create copy of left-half
    const left = tmp.slice(l, m + 1);

    //Create copy of right-half
    const right = tmp.slice(m + 1, r + 1);

    //Empty array to merge the two subarrays
    let mergedArray = [];

    //Variable for merging
    let num;

    /* Zero is a falsy value, so when one of these subarrays
     * hits length zero, the condition will return false.
     */
    while (left.length && right.length) {
        //If first number of left is < first number of right
        if (left[0] < right[0]) {
            //Shift left, store that value in num
            num = left.shift();
        } else {
            //Otherwise, shift right, store that value in num
            num = right.shift();
        }

        //Our merged array gets num pushed onto its end
        mergedArray.push(num);

        /* We assign another temporary array the value of
         * our source array with the spread operator, but
         * we slice it to leave space for our new subarrays.
         * It is necessary for the animation to do this
         * every time we push a new value to the merged
         * array.
         */
        let tmpArray = [
            ...tmp.slice(0, l),
            ...mergedArray,
            ...left,
            ...right,
            ...tmp.slice(r + 1)
        ];

        /* We update our array in the store according to our tmpArray
         * variable. The timeIndex variable in our redux store determines
         * how long it takes our source array to be updated to this specific
         * variation. We do this because of JavaScript's asyncronous nature.
         * If we were using a different programming language, we would trade
         * this operation for a 'pause' function.
         */

        //We add one to our time index shift
        store.dispatch({type: 'TIME INDEX SHIFT', operation: '+'});
        setTimeout(() => {
            //Source array gets the value of our tmpArray variable
            store.dispatch({
                type: 'ARRAY UPDATE',
                replacement: [...tmpArray]
            });
            //After we're done, we decrement the value of the time index
            store.dispatch({type: 'TIME INDEX SHIFT', operation: '-'});
        }, store.getState().timeoutIndex * 7);
        // ^^Function takes timeoutIndex * 15 milliseconds to start its execution
    }

    /* Our subject array is now merged, so now we return tmp with
     * the same value that we gave tmpArray in the above while loop.
     * We cannot just assign tmp this value inside the while loop instead
     * of tmpArray, because it creates a bug. This is one of those "I have
     * no idea why, but it's working" moments.
     */
    
    tmp = [
        ...tmp.slice(0, l),
        ...mergedArray,
        ...left,
        ...right,
        ...tmp.slice(r + 1)
    ];

    return tmp;

};

const swap = (arr, i, j) => {
    const tmpArr = [...arr];
    const tmpNum = tmpArr[i];

    tmpArr[i] = tmpArr[j];

    store.dispatch({type: 'TIME INDEX SHIFT', operation: '+'});
    setTimeout(() => {
        store.dispatch({type: 'ARRAY UPDATE', replacement: tmpArr});
        store.dispatch({type: 'TIME INDEX SHIFT', operation: '-'});
    }, store.getState().timeoutIndex * 10);

    tmpArr[j] = tmpNum;

    return tmpArr;
};

const partition = (arr, l, r) => {
    let tmp = [...arr];

    const pivot = tmp[r];

    let i = l - 1;

    for (let j = l; j <= r - 1; j++) {
        if (tmp[j] < pivot) {

            i++;
            
            tmp = swap(tmp, i, j);
        }
    }

    tmp = swap(tmp, i + 1, r);

    return {pi: i + 1, replacement: tmp};
};

const quickSort = (arr, l, r) => {
    let tmp = [...arr];

    if (l < r) {
        const partitionObj = partition(tmp, l, r);
        const pi = partitionObj.pi;
        tmp = partitionObj.replacement;
        
        tmp = quickSort(tmp, l, pi - 1);
        tmp = quickSort(tmp, pi + 1, r);

    }

    return tmp;
};

const selectionSort = (arr, firstIndex) => {
    let tmp = [...arr];
    let tmpArr;

    let smallestNumIndex = firstIndex;

    store.dispatch({type: 'CHANGE BAR COLOR', index: 4, color: 'red'});

    // for (let i = firstIndex + 1; i < tmp.length; i++) {

    //     store.dispatch({type: 'TIME INDEX SHIFT', operation: '+'});
    //     setTimeout(() => {
    //         store.dispatch({type: 'CHANGE BAR COLOR', index: i, color: '#E4384F'});
    //         store.dispatch({type: 'CHANGE BAR COLOR', index: store.getState().redBarIndex, color: '#474CFF'});
    //         store.dispatch({type: 'CHANGE RED BAR', index: i});
    //         store.dispatch({type: 'TIME INDEX SHIFT', operation: '-'});
    //     }, store.getState().timeoutIndex * 30);
        
        // if (tmp[i] < tmp[smallestNumIndex]) {
        //     smallestNumIndex = i;
        // }
    // }

    // if (smallestNumIndex !== firstIndex) {
    //     const tmpNum = tmp[firstIndex];
    //     tmp[firstIndex] = tmp[smallestNumIndex];
    //     tmp[smallestNumIndex] = tmpNum;
    // }

    // tmpArr = [...tmp];
    // store.dispatch({type: 'TIME INDEX SHIFT', operation: '+'});
    // setTimeout(() => {
    //     store.dispatch({type: 'ARRAY UPDATE', replacement: tmpArr});
    //     store.dispatch({type: 'TIME INDEX SHIFT', operation: '-'});
    // }, store.getState().timeoutIndex * 1);

    // if (firstIndex !== tmp.length - 1) {
    //     tmp = selectionSort(tmp, firstIndex + 1);
    // }
};