const initialState = {
    products: [],
    categories: [],
    loading: false,
    filteredProducts: []
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
        case "GET_FILTERED_PRODUCTS_BY_SEARCH_WORD":
            return {
                ...state,
                filteredProducts: state.products.filter(item => {
                    return item.name.toLowerCase().includes(action.searchWord.toLowerCase())
                })
            }
        default:
            return state
    }
}

export default rootReducer