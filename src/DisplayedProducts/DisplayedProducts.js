import React from 'react'
import ProductCard from './../ProductCard/ProductCard';
import PropTypes from "prop-types";
import './DisplayedProducts.css'

const DisplayedProducts = ({
    displayedProducts
}) => {
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

export default DisplayedProducts