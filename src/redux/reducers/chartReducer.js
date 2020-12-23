const chartReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_CHART':
            return action.payload;
        default:
            return state;
    }
};

export default chartReducer;
