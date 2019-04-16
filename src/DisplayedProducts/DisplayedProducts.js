import React from 'react'
import ProductCard from './../ProductCard/ProductCard';
import PropTypes from "prop-types";
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import './DisplayedProducts.css'

const DisplayedProducts = ({
    products,
    location
}) => {
    const category = location.pathname.split('/')[2];
    
    const displayedProducts = location.pathname === '/' ? products 
    : products.filter(item => item.bsr_category.split(' ').join('') === category)

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