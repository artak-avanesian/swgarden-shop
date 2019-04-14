import React, { Component } from 'react';
import { Container, Row, Col} from 'react-bootstrap'
import { Route, withRouter } from 'react-router-dom'
import Menu from './Menu/Menu';
import { uniq } from 'lodash'
import DisplayedProducts from './DisplayedProducts/DisplayedProducts';
import SearchProducts from './SearchProducts/SearchProducts';
import { connect } from 'react-redux';
import SearchField from './SearchField/SearchField';

class App extends Component {

    state = {
        value: '',
        search: '',
        displayedProducts: [],
    }

    componentDidMount() {
        this.props.fetchData()
    }

    valueChangeHandler = event => {
        this.setState({
            value: event.target.value
        })
        const { history } = this.props
        history.push({
            search: this.state.value.length > 0 ? '' + new URLSearchParams({ value: event.target.value }) : null
        })
    }

    handlerKeyPress = event => {
        const {location} = this.props
        if (event.key === 'Enter' && this.state.value) {
            this.setState(prevState => ({
                search: prevState.value
            }))
            location.pathname = '/search'
        }
    }

    getFilteredProducts = () => {

        const {search} = this.state

        if (!search) return []

        return this.props.products.filter((item) => {
            return item.name.toLowerCase().includes(search.toLowerCase())
        })
    }

    changeCategory = (category) => {
        this.setState({
            displayedProducts: this.props.products.filter(item => item.bsr_category === category)
        })
    } 

    render() {

        const filteredProducts = this.getFilteredProducts()
        const { products, categories } = this.props

        return (
            <Container>
                <Row>
                    <Col>
                        <SearchField
                            value={this.state.value}
                            valueChangeHandler={this.valueChangeHandler}
                            handlerKeyPress={this.handlerKeyPress}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col lg={2}>
                        <Menu
                            categories={uniq(categories)}
                            changeCategory={this.changeCategory}
                        />
                    </Col>
                    <Col lg={10}>
                        <Route exact path='/' render={() => <DisplayedProducts
                            displayedProducts={products}
                        />}/>
                        <Route path='/search' render={() => <SearchProducts
                            filteredProducts={filteredProducts}
                            searchStr={this.state.search}
                        />}/>
                        {
                            uniq(categories).map((item, index) => (
                                <Route key={index} path={`/${item}`} render={() => <DisplayedProducts
                                    displayedProducts={this.state.displayedProducts}
                                />}/>
                            ))
                        }
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    products: state.products,
    categories: state.categories
})

const mapDispatchToProps = dispatch => ({
    fetchData: () => dispatch({
        type: 'FETCH_DATA'
    })
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(App));
