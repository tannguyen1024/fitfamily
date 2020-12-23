import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* giphySaga() {
    yield takeLatest('FETCH_SEARCH', fetchSearch);
    yield takeLatest('POST_GIPHY', postGiphy);
}

function* fetchSearch(action) {
    try {
        const response = yield axios.get(`/api/giphy/${action.payload}`);
        yield put({ type: 'SET_SEARCH', payload: response.data });
    }
    catch (error) {
        console.log('Error in postFeed:', error);
    }
}

function* postGiphy(action) {
    try {
        yield axios.post('/api/giphy', action.payload);
    }
    catch (error) {
        console.log('Error in postGiphy:', error);
    }
}

export default giphySaga;