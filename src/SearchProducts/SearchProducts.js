import React from 'react'
import ProductCard from './../ProductCard/ProductCard';


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

export default SearchProducts