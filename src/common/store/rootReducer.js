const initialState = {
    products: [],
    categories: [],
    loading: false
}

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case "FETCH_DATA":
            return {
                ...state,
                loading: true
            }
        case "SET_PRODUCTS":
            return {
                ...state,
                products: action.products,
                loading: false
            }
        case "GET_CATEGORIES":
            return {
                ...state,
                categories: action.data.products.map(item => item.bsr_category)
            }
        default:
            return state
    }
}

export default rootReducer