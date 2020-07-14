import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* feedSaga() {
    yield takeLatest('FETCH_FEED', fetchFeed);
    yield takeLatest('POST_FEED', postFeed);
    yield takeLatest('DELETE_FEED', deleteFeed);
    yield takeLatest('UPVOTE_FEED', upvoteFeed);
}

function* fetchFeed() {
    try {
        const response = yield axios.get('/feed')
        yield put({ type: 'SET_FEED', payload: response.data })
    }
    catch (error) {
        console.log('Error in fetchFeed:', error);
    }
}

function* postFeed(action) {
    try {
        yield axios.post('/feed', action.payload);
        yield put({ type: 'FETCH_FEED' });
    }
    catch (error) {
        console.log('Error in postFeed:', error);
    }
}

function* deleteFeed(action) {
    try {
        let feed_id = action.payload;
        yield axios.delete(`/feed/${feed_id}`, action.payload);
        yield put({ type: 'FETCH_FEED' });
    }
    catch (error) {
        console.log('Error in deleteFeed:', error);
    }
}

function* upvoteFeed(action) {
    try {
        let feed_id = action.payload;
        yield axios.put(`/feed/${feed_id}`);
        yield put({ type: 'FETCH_FEED' });
    }
    catch (error) {
        console.log('Error in deleteFeed:', error);
    }
}


export default feedSaga;