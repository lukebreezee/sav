import { mergeSort } from "./helpers";
export { reducer };

const reducer = (state = [], action) => {
    let tmp = [...state];
    
    switch(action.type) {
      case 'RANDOMIZE':
        tmp = [];
        for (let i = 0; i < 100; i++) {
          let num = Math.floor(Math.random() * 100);
          tmp.push(num);
        }
        break;
      case 'MERGE SORT':
        tmp = mergeSort(tmp, 0, tmp.length - 1);
        break;
      default:
        return state;
    }
  
    return tmp;
  };