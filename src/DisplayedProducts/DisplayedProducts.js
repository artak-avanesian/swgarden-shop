import React from 'react'
import PropTypes from "prop-types";
import { withRouter } from 'react-router-dom'
import queryString from 'querystring'
import { connect } from 'react-redux'
import ProductCard from './../ProductCard/ProductCard';
import SearchProducts from '../SearchProducts/SearchProducts';
import './DisplayedProducts.css'

const DisplayedProducts = ({
    products,
    location,
    history
}) => {
    const category = location.pathname.split('/')[2];
    
    const displayedProducts = location.pathname === '/' ? products 
    : products.filter(item => item.bsr_category.split(' ').join('') === category)

    if (location.search && history.action === 'POP') {
        return (
            <SearchProducts
                searchStr={queryString.parse(location.search)['?name']}
            />
        )
    }
    return (
        <section>
        {
            displayedProducts.map((item) => (
                <ProductCard
                    key={item.asin}
                    product={item}
                />
            ))
        }
    </section>
    )
}

DisplayedProducts.propTypes = {
    displayedProducts: PropTypes.array
}

const mapStateToProps = state => ({
    products: state.products
})

export default connect(
    mapStateToProps
)(withRouter(DisplayedProducts))