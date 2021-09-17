import { actionCreator } from './action-creators';
export { mapState, mapDispatch }

//Gives components the 'nums' array in the redux store
const mapState = state => {
    return {
        nums: state.nums
    };
};

//Allows us the dispatch in components without calling store.dispatch
const mapDispatch = dispatch => {
    return {
        stateDispatch: actionType => {
            dispatch(actionCreator(actionType));
        }
    };
};