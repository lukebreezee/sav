export { actionCreator, numsSplice };

const actionCreator = actionType => {
    return {
        type: actionType
    };
};

const numsSplice = (actionType, index, amount, replacement) => {
    return {
        type: actionType,
        index: index,
        amount: amount,
        replacement: replacement
    };
};