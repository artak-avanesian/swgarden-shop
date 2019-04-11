import React from 'react'
import { Card } from 'react-bootstrap'
import './ProductCard.css'

const ProductCard = ({product}) => (
    <Card key={product.asin} style={{width: '17rem'}}>
        <Card.Body>
            <Card.Title>
                <span className='name' title={product.name}>{product.name}</span>
            </Card.Title>
        </Card.Body>
        <Card.Img variant="top" src={product.img} alt={product.name} height='200'/>
        <Card.Body>
            <Card.Text>
                <span className='bold'>Price:</span> {product.price} &#163;
            </Card.Text>
        </Card.Body>
    </Card>
)

export default ProductCard