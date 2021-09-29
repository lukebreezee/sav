//This file contains our sorting functions and helpers for those functions

import { store } from '.';
export { mergeSort, quickSort, selectionSort, bubbleSort, colorize, changeProgress };

/* Merge sort with bounds of a single array (no copies created).
 * arr is the source array, l is the leftmost index of our subarray,
 * r is the rightmost index of our subarray. Runs in O(nlogn) time.
 */

const mergeSort = (arr, l, r) => {
    //Keep track of our sorting speed
    const sortingSpeed = store.getState().sortingSpeed;

    //Set the color of each bar back to blue
    colorize(-1, '#474CFF', sortingSpeed * .5);

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
    let obj;

    /* Zero is a falsy value, so when one of these subarrays
     * hits length zero, the condition will return false.
     */

    while (left.length && right.length) {
        //If first number of left is < first number of right
        if (left[0].value < right[0].value) {
            //Shift left, store that value in num
            obj = left.shift();
        } else {
            //Otherwise, shift right, store that value in num
            obj = right.shift();
        }

        //Turn bar red
        store.dispatch({type: 'TIME INDEX SHIFT', operation: '+'});
        setTimeout(() => {
            obj.color = '#FF0000';

            store.dispatch({type: 'TIME INDEX SHIFT', operation: '-'});
        }, store.getState().timeoutIndex * sortingSpeed * .5);

        //Our merged array gets num pushed onto its end
        mergedArray.push(obj);

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

        //Turn the merged bars cyan
        colorize(l + mergedArray.length + left.length - 1, '#00FFFF', sortingSpeed * .5);
        colorize(l + mergedArray.length + right.length - 1, '#00FFFF', sortingSpeed * .5);
        colorize(l + mergedArray.length - 1, '#00FFFF', sortingSpeed * .5);
        
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
        }, store.getState().timeoutIndex * sortingSpeed * .5);
        // ^^Function takes sortingSpeed * .5 milliseconds to start its execution
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

//Specific to quickSort; swaps two objects in the array, displays pretty colors
const swap = (arr, i, j, speed) => {
    //Turn all bars in array back to blue
    colorize(-1, '#474CFF', speed);

    //Create temp copy of arr
    const tmpArr = [...arr];

    //Placeholder object
    const tmpObj = tmpArr[i];

    //Assign one value to the other
    tmpArr[i] = tmpArr[j];

    //Assign the placeholder value to tmpArr[j]

    //Updating our time index for animation flow
    store.dispatch({type: 'TIME INDEX SHIFT', operation: '+'});
    setTimeout(() => {
        //Replace our array with the copy
        store.dispatch({type: 'ARRAY UPDATE', replacement: tmpArr});

        //Two swapped values get different colors, red and yellow
        store.dispatch({type: 'COLORIZE', index: i, color: '#FF0000'});
        store.dispatch({type: 'COLORIZE', index: j, color: '#FFFF00'});

        //When we're done we decrement our time index
        store.dispatch({type: 'TIME INDEX SHIFT', operation: '-'});
    }, store.getState().timeoutIndex * speed);
    //^Speed parameter gets passed through partition function

    //Object's value and color gets replaced by our temporary variable foe tmp[i]
    tmpArr[j] = tmpObj;

    return tmpArr;
};

//Partitions larger elements to right, smaller to left
const partition = (arr, l, r) => {
    //Sorting speed from redux store
    const sortingSpeed = store.getState().sortingSpeed;

    //Create copy of arr for non-mutational purposes
    let tmp = [...arr];

    //Pick last element in array as a reference value to pivot around
    const pivot = tmp[r].value;

    //Counter variable
    let i = l - 1;

    //For each element in subarray...
    for (let j = l; j <= r - 1; j++) {
        //If the 'Jth' object's value is greater than our pivot value...
        if (tmp[j].value < pivot) {
            //Counter variable increments
            i++;

            //Swap 'Jth' object with 'Ith' object
            tmp = swap(tmp, i, j, sortingSpeed);
        }
    }

    /* Swap object at tmp[i + 1] with our pivot value.
     * Our pivot value is now in the right place.
     */
    tmp = swap(tmp, i + 1, r, sortingSpeed);

    //Need to return the new index of the pivot value and replace the array
    return {pi: i + 1, replacement: tmp};
};

//Implement Quick Sort or 'Pivot Sort'
//Runs in O(nlogn)
const quickSort = (arr, l, r) => {
    //Create copy of our array
    let tmp = [...arr];

    //If subarray size is > 1...
    if (l < r) {
        //Call our partition function, assign its return value to this variable
        const partitionObj = partition(tmp, l, r);

        //Variable for the partition index
        const pi = partitionObj.pi;

        //Variable for the replacement array
        tmp = partitionObj.replacement;
        
        //Call quickSort on the left half of the subarray
        //We exclude the value at partition index because it is in its correct place
        tmp = quickSort(tmp, l, pi - 1);

        //Call quickSort on right half of subarray
        //These subarrays are rarely ever equal in size, but that is okay
        tmp = quickSort(tmp, pi + 1, r);

    }

    //Return our copy when we are finished
    return tmp;
};

//Scans through the subarray, finds smallest value, replaces with first value
//Runs in O(n^2)
const selectionSort = (arr, firstIndex) => {
    //Sorting speed property from redux store
    const sortingSpeed = store.getState().sortingSpeed;

    //Create copy of our array
    let tmp = [...arr];

    //Start out with the number at firstIndex being the smallest
    let smallestNumIndex = firstIndex;

    //Iterate through the subarray
    for (let i = firstIndex + 1; i < tmp.length; i++) {
        //Increment our time index
        store.dispatch({type: 'TIME INDEX SHIFT', operation: '+'});
        //This setTimeout turns a bar red when it is being scanned
        //It also turns the previous scanned element back to blue
        setTimeout(() => {
            //If this is first element in subarray, make last element blue again
            if (i === firstIndex + 1) {
                store.dispatch({type: 'COLORIZE', index: tmp.length - 1, color: '#474CFF'});
            } else { //If not, turn the previous element back to blue
                store.dispatch({type: 'COLORIZE', index: i - 1, color: '#474CFF'});
            }
            //Turn the current element red
            store.dispatch({type: 'COLORIZE', index: i, color: '#FF0000'});

            //Decrement our time index
            store.dispatch({type: 'TIME INDEX SHIFT', operation: '-'});
        }, store.getState().timeoutIndex * sortingSpeed);

        //If the current value is smaller than the value at smallestNumIndex...
        if (tmp[i].value < tmp[smallestNumIndex].value) {
            //We set smallestNumIndex equal to the current index
            smallestNumIndex = i;
        }
    }

    //If the first number in the subarray is not the smallest, swap bars
    if (smallestNumIndex !== firstIndex) {
        //Temporary variable
        const tmpNum = tmp[firstIndex];

        //Assign value at smallestNumIndex to value at firstIndex
        tmp[firstIndex] = tmp[smallestNumIndex];

        //Assign value at smallestNumIndex to our temporary variable
        tmp[smallestNumIndex] = tmpNum;
    }

    //Create copy of our copy
    const tmpArr = [...tmp];

    //Once again, increment the time index
    store.dispatch({type: 'TIME INDEX SHIFT', operation: '+'});
    setTimeout(() => {
        //Replace redux array with tmpArr
        store.dispatch({type: 'ARRAY UPDATE', replacement: tmpArr});

        //To show viewer that this bar is in place, it turns red
        store.dispatch({type: 'COLORIZE', index: firstIndex, color: '#FF0000'});

        //Decrement our time index
        store.dispatch({type: 'TIME INDEX SHIFT', operation: '-'});
    }, store.getState().timeoutIndex * sortingSpeed);

    //If the subarray is not of size 1...
    if (firstIndex !== tmp.length - 1) {
        //Recursively call selectionSort with incremented firstIndex
        selectionSort(tmp, firstIndex + 1);
    }
};

//Iterates through array, looks at two values at a time, swaps if not in order
//Runs in O(n^2)
const bubbleSort = (arr, rightBound) => {
    //Sorting speed from redux store
    const sortingSpeed = store.getState().sortingSpeed;

    //Create copy of array
    let tmp = [...arr];

    //Iterate through the array
    for (let i = 0; i < rightBound - 1; i++) {
        //Turn the current bar red
        colorize(i, '#FF0000', sortingSpeed);
        
        //Then turn it back to blue (colorize function includes a setTimeout)
        colorize(i, '#474CFF', sortingSpeed);

        //If the current value is greater than the next, swap the objects
        if (tmp[i].value > tmp[i + 1].value) {
            //Temporary variable
            const tmpNum = tmp[i];
            //'Ith' element gets value of element at i + 1
            tmp[i] = tmp[i + 1];
            //Element at i + 1 gets temporary variable
            tmp[i + 1] = tmpNum;

            //Create copy of our copy
            const tmpArr = [...tmp];

            //Increment the time index
            store.dispatch({type: 'TIME INDEX SHIFT', operation: '+'});
            setTimeout(() => {
                //Replace redux array with tmpArr
                store.dispatch({type: 'ARRAY UPDATE', replacement: tmpArr});

                //Decrement our time index
                store.dispatch({type: 'TIME INDEX SHIFT', operation: '-'});
            }, store.getState().timeoutIndex * sortingSpeed);
        }
    }

    //Turn last element in the subarray red to show it is in the right place
    colorize(rightBound - 1, '#FF0000', sortingSpeed);

    //If the subarray size is > 2...
    if (rightBound > 1) {
        //Recursively call bubbleSort with decremented right bound
        tmp = bubbleSort(tmp, rightBound - 1);
    }

    //Return the copy when finished
    return tmp;
}

//Uses setTimeout to change a bar's color in the redux array
const colorize = (index, color, speedIndex) => {
    //Increment our time index in the redux store
    store.dispatch({type: 'TIME INDEX SHIFT', operation: '+'});
    setTimeout(() => {
        //Change the color of the array at the 'index' parameter
        store.dispatch({type: 'COLORIZE', index: index, color: color});

        //Decrement our time index
        store.dispatch({type: 'TIME INDEX SHIFT', operation: '-'});
    }, store.getState().timeoutIndex * speedIndex);
    //^Speed index comes from redux store, controls the animation flow
}

/*This function changes the boolean value 'inProgress'
 * If the value is true, pressing a button on the navbar 
 * or shifting the size/speed slider will not call any functions
 */
const changeProgress = speedIndex => {
    //Increment our time index
    store.dispatch({type: 'TIME INDEX SHIFT', operation: '+'});
    setTimeout(() => {
        //Switches inProgress property to the opposite of its current value
        store.dispatch({type: 'CHANGE PROGRESS'});
    }, store.getState().timeoutIndex * speedIndex);
}