import React from 'react'
import ProductCard from './../ProductCard/ProductCard';
import './DisplayedProducts.css'

const DisplayedProducts = ({
    displayedProducts,
}) => (
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
export default DisplayedProducts