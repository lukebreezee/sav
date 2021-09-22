import { initialState } from './index.js'
import { replace } from './helpers.js'
export { reducer };

//Declare our reducer with the initialState object from index.js
const reducer = (state = initialState, action) => {
    //Create a temporary copy of state to avoid mutation
    let tmp = Object.assign({}, state);
    
    //Our simple switch statement
    switch(action.type) {
      //Generates new, random array
      case 'RANDOMIZE':
        tmp.barProperties = [];
        for (let i = 0; i < 300; i++) {
          let num = Math.floor(Math.random() * 100);
          tmp.barProperties.push({value: num, color: '#474CFF'});
        }
        break;

      //Assigns our 'nums' array in the store to its replacement using spread operator
      case 'ARRAY UPDATE':
        //tmp.nums = [...action.replacement];
        for (let i = 0; i < action.replacement.length; i++) {
          tmp.barProperties[i].value = action.replacement[i];
        }
        break;

      //Swaps elements in our 'nums' array
      // case 'SWAP':
      //   const tmpArray = [...tmp.nums];
      //   const swapPlaceholder = tmpArray[action.i];
      //   tmpArray[action.i] = tmpArray[action.j];
      //   tmpArray[action.j] = swapPlaceholder;
      //   tmp.nums = [...tmpArray];
      //   break;

      /* Updates the 'timeIndex' variable, this is necessary for the
       * animation and is explained farther in 'helpers.js'
       */
      case 'TIME INDEX SHIFT':
        if (action.operation === '+') {
          tmp.timeoutIndex = tmp.timeoutIndex + 1;
        } else {
          tmp.timeoutIndex = tmp.timeoutIndex - 1;
        }
        break;

      case 'CHANGE BAR COLOR':
        // const tmpArr = Object.assign({}, tmp);
        // tmpArr.barColors.splice(action.index, 1, action.color);  //[action.index] = action.color;
        // tmp = tmpArr;
        tmp.barColors[action.index].color = action.color;
        break;

      case 'CHANGE RED BAR':
        tmp.redBarIndex = action.index;
        break;

      //Default case for initialization of store
      default:
        return state;
    }

    //We return our temporary copy of the store
    return tmp;
};