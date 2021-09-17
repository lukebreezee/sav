import { store } from ".";

export { actionCreator };

//Basic creator for actions that have just a 'type' property
const actionCreator = actionType => {
    return {
        type: actionType
    };
};