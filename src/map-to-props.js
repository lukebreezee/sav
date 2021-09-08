import { actionCreator } from './action-creators';
export { mapState, mapDispatch }

const mapState = state => {
    return {
        state: state
    };
};

const mapDispatch = dispatch => {
    return {
        stateDispatch: actionType => {
            dispatch(actionCreator(actionType));
        }
    };
};