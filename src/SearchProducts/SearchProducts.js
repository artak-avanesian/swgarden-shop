import React from 'react'
import ProductCard from './../ProductCard/ProductCard';
import { connect } from 'react-redux'

const SearchProducts = ({
    filteredProducts,
    searchStr,
}) => (
    <section>
    {
        filteredProducts.length === 0 && searchStr ? 
        <p>Products with the same name is missing. Please, try again.</p> 
        : filteredProducts.length > 0 ? filteredProducts.map((item) => (
            <ProductCard
                key={item.asin}
                product={item}
            />
        ))
        : null
    }
    </section>
)

const mapStateToProps = state => ({
    filteredProducts: state.filteredProducts
})

export default connect(
    mapStateToProps
)(SearchProducts)