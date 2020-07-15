import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* weightSaga() {
    yield takeLatest('FETCH_WEIGHT', fetchWeight);
    yield takeLatest('FETCH_ONE_WEIGHT', fetchOneWeight);
    yield takeLatest('POST_WEIGHT', postWeight);
    yield takeLatest('DELETE_WEIGHT', deleteWeight);
    yield takeLatest('FETCH_CHART', fetchChart);
}

function* postWeight(action) {
    try {
        yield axios.post('/weight', action.payload)
        yield put({ type: 'FETCH_ONE_WEIGHT', payload: action.payload.user_id })
        yield put({ type: 'FETCH_CHART', payload: action.payload.user_id })
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

function* fetchChart(action) {
    try {
        const response = yield axios.get(`/weight/chart/${action.payload}`)
        yield put({ type: 'SET_CHART', payload: response.data[0] })
    }
    catch (error) {
        console.log('Error in fetchOneWeight:', error);
    }
}

function* deleteWeight(action) {
    try {
        let weight_id = action.payload;
        yield axios.delete(`/weight/${weight_id}`, action.payload);
        yield put({ type: 'FETCH_ONE_WEIGHT', payload: action.user });
        yield put({ type: 'FETCH_CHART', payload: action.payload.user_id })
    }
    catch (error) {
        console.log('Error in deleteFeed:', error);
    }
}

export default weightSaga;