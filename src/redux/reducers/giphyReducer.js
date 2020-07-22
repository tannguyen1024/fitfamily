const giphyReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_SEARCH':
            return action.payload.data;
        default:
            return state;
    }
};

export default giphyReducer;
