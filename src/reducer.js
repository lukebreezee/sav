import { initialState } from './index.js'
export { reducer };

//Declare our reducer with the initialState object from index.js
const reducer = (state = initialState, action) => {
    //Create a temporary copy of state to avoid mutation
    let tmp = Object.assign({}, state);
    
    //Our simple switch statement
    switch(action.type) {
      //Generates new, random array
      case 'RANDOMIZE':
        //Array becomes empty
        tmp.barProperties = [];

        //Repeat tmp.numBars times...
        for (let i = 0; i < tmp.numBars; i++) {
          //Random value between 0 and 99
          let num = Math.floor(Math.random() * 100);

          //Push object to tmp.barProperties array with a blueish color
          tmp.barProperties.push({value: num, color: '#474CFF'});
        }
        break;

      //Assigns our 'nums' array in the store to its replacement using spread operator
      case 'ARRAY UPDATE':
        tmp.barProperties = [...action.replacement];
        break;

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

      //Changes the color property of a specific object in barProperties
      case 'COLORIZE':
        //Create copy of array because we need to mutate
        let tmpArr = [...tmp.barProperties];

        //If index parameter is -1...
        if (action.index === -1) {
          //For each object in array...
          for (let i = 0; i < tmpArr.length; i++) {
            //Its color property gets the color parameter
            tmpArr[i].color = action.color;
          }
        } else {
          //Change color property at specific index the specified color
          tmpArr[action.index].color = action.color;
        }

        //Assign tmpArr to the redux array
        tmp.barProperties = tmpArr;
        break;

      //Changes number of bars shown on screen when combined with 'randomize'
      case 'BAR COUNT UPDATE':
        tmp.numBars = action.amount;
        break;

      //Changes sorting speed property; this value is passed into setTimeout
      case 'SORTING SPEED UPDATE':
        tmp.sortingSpeed = 1000 / action.amount;
        break;

      //Sets inProgress to opposite value when a visualization starts/finishes
      case 'CHANGE PROGRESS':
        tmp.inProgress = !tmp.inProgress;
        break;

      //Default case for initialization of store
      default:
        return state;
    }

    //We return our temporary copy of the store
    return tmp;
};