import { actionCreator } from './action-creators';
export { mapState, mapDispatch }

const mapState = state => {
    return {
        nums: state.nums
    };
};

const mapDispatch = dispatch => {
    return {
        stateDispatch: actionType => {
            dispatch(actionCreator(actionType));
        }
    };
};