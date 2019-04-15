const initialState = {
    products: [],
    categories: [],
    loading: false,
    displayedProducts: [],
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
        case "CHANGE_CATEGORY":
            return {
                ...state,
                displayedProducts: state.products.filter(item => item.bsr_category === action.category)
            }
        case "GET_FILTERED_PRODUCTS":
            return {
                ...state,
                filteredProducts: state.products.filter(item => {
                    return item.name.toLowerCase().includes(action.search.toLowerCase())
                })
            }
        default:
            return state
    }
}

export default rootReducer