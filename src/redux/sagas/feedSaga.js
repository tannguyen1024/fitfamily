//FETCH_FEED

import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* feedSaga() {
    yield takeLatest('FETCH_FEED', fetchFeed);
}

function* fetchFeed() {
    try {
        const response = yield axios.get('/feed')
        yield put({ type: 'SET_FEED', payload: response.data })
    }
    catch (error) {
        console.log('Error in fetchFeed:', error)
    }
}

export default feedSaga;