const weightOneReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ONE_WEIGHT':
            return action.payload;
        default:
            return state;
    }
};

export default weightOneReducer;
