import { takeEvery, put, all } from 'redux-saga/effects'

function* watchRequestProducts() {
    yield takeEvery('FETCH_DATA', fetchProducts)
}

function* fetchProducts() {
    const data = yield fetch("/products.json").then(response => response.json())
    yield put({
        type: 'SET_PRODUCTS', 
        products: data.products
    })
    yield put({
        type: 'GET_CATEGORIES',
        data
    })
}

export default function* rootSaga() {
    yield all([watchRequestProducts()])
}