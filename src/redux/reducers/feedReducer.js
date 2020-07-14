const feedReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_FEED':
            return action.payload;
        default:
            return state;
    }
};

export default feedReducer;
