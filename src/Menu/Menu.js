import React from 'react'
import { Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { uniq } from 'lodash'
import PropTypes from "prop-types";
import './Menu.css'

const Menu = ({
    categories,
    changeCategory,
}) => (
    <Nav defaultActiveKey="/" className="flex-column">
        <NavLink 
            to="/" 
            className='nav-link'
        >
            All products
        </NavLink>
        {
            uniq(categories).map((item, index) => (
                <NavLink
                    className='nav-link'
                    key={index} 
                    to={`/category/${item.split(' ').join('')}`}
                    onClick={() => changeCategory(item)}
                >
                    {item}
                </NavLink>
            ))
        }
    </Nav>
)

Menu.propTypes = {
    categories: PropTypes.array,
    changeCategory: PropTypes.func
}

const mapStateToProps = state => ({
    categories: state.categories
})

const mapDispatchToProps = dispatch => ({
    changeCategory: category => dispatch({
        type: 'CHANGE_CATEGORY',
        category
    })
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Menu)