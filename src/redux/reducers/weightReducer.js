const weightReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_WEIGHT':
            return action.payload;
        default:
            return state;
    }
};

export default weightReducer;
