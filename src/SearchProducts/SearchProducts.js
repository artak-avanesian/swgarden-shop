import React from 'react'
import { connect } from 'react-redux'
import PropTypes from "prop-types";
import ProductCard from './../ProductCard/ProductCard';
import './SearchProducts.css'

const SearchProducts = ({
    filteredProducts,
    searchStr
}) => (
    <section className={filteredProducts.length === 0 ? 'results' : null}>
    {
        filteredProducts.length === 0 && searchStr ? 
        <p className='no-results'>No results for <span className='search-word'>{searchStr}</span>. Please, try again.</p>
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

SearchProducts.propTypes = {
    filteredProducts: PropTypes.array,
    searchStr: PropTypes.string
}

const mapStateToProps = state => ({
    filteredProducts: state.filteredProducts
})

export default connect(
    mapStateToProps
)(SearchProducts)