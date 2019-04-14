import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Menu.css'

const Menu = ({
    categories,
    changeCategory,
}) => (
    <Nav defaultActiveKey="/" className="flex-column">
        <Link 
            to="/" 
            className='nav-link'
        >
            All products
        </Link>
        {
            categories.map((item, index) => (
                <Link
                    className='nav-link'
                    key={index} 
                    to={`/${item}`}
                    onClick={() => changeCategory(item)}
                >
                    {item}
                </Link>
            ))
        }
    </Nav>
)

export default Menu