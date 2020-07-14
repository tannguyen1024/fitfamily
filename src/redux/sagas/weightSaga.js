import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* weightSaga() {
    yield takeLatest('FETCH_WEIGHT', fetchWeight);
    yield takeLatest('FETCH_ONE_WEIGHT', fetchOneWeight);
    yield takeLatest('POST_WEIGHT', postWeight);
}

function* postWeight(action) {
    try {
        yield axios.post('/weight', action.payload)
        yield put({ type: 'FETCH_ONE_WEIGHT', payload: action.payload.user_id })
    }
    catch (error) {
        console.log('Error in postWeight:', error);
    }
}

function* fetchWeight() {
    try {
        const response = yield axios.get('/weight')
        yield put({ type: 'SET_WEIGHT', payload: response.data })
    }
    catch (error) {
        console.log('Error in fetchWeight:', error);
    }
}

function* fetchOneWeight(action) {
    try {
        const response = yield axios.get(`/weight/${action.payload}`)
        yield put({ type: 'SET_ONE_WEIGHT', payload: response.data })
    }
    catch (error) {
        console.log('Error in fetchOneWeight:', error);
    }
}

export default weightSaga;