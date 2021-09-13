import { mergeSort } from './helpers';
import { initialState } from './index.js'
export { reducer };

const reducer = (state = initialState, action) => {
    let tmp = Object.assign({}, state);
    
    switch(action.type) {
      case 'RANDOMIZE':
        tmp.nums = [];
        for (let i = 0; i < 100; i++) {
          let num = Math.floor(Math.random() * 100);
          tmp.nums.push(num);
        }
        break;
      case 'MERGE SORT':
        tmp.nums = mergeSort(tmp.nums, 0, tmp.nums.length - 1);
        break;
      case 'ARRAY UPDATE':
        tmp.nums = [...action.replacement];
        break;
      default:
        return state;
    }

    return tmp;
};