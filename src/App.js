import React, { Component } from 'react';
import { Container, Row, Col} from 'react-bootstrap'
import { Route, withRouter } from 'react-router-dom'
import Menu from './Menu/Menu';
import { uniq } from 'lodash'
import DisplayedProducts from './DisplayedProducts/DisplayedProducts';
import SearchProducts from './SearchProducts/SearchProducts';
import { connect } from 'react-redux';
import SearchField from './SearchField/SearchField';
import Loader from './Loader/Loader'

class App extends Component {

    state = {
        value: '',
        search: '',
    }

    componentDidMount() {
        const { location, history } = this.props
        if (location.pathname !== '/') {
            history.push(location.pathname)
        }
        this.props.fetchData()
    }

    valueChangeHandler = event => {
        this.setState({
            value: event.target.value
        })
        const { history } = this.props
        history.push({
            search: this.state.value.length > 0 ? '?' + new URLSearchParams({ name: event.target.value }) : null
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

    render() {

        const {
            products, 
            categories, 
            loading,
            displayedProducts,
            getFilteredProducts 
        } = this.props

        getFilteredProducts(this.state.search)

        if (loading) {
            return <Loader/>
        }

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
                        <Menu />
                    </Col>
                    <Col lg={10}>
                        <Route exact path='/' render={() => <DisplayedProducts
                            displayedProducts={products}
                        />}/>
                        <Route path='/search' render={() => <SearchProducts
                            searchStr={this.state.search}
                        />}/>
                        {
                            uniq(categories).map((item, index) => (
                                <Route key={index} path={`/${item}`} render={() => <DisplayedProducts
                                    displayedProducts={displayedProducts}
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
    categories: state.categories,
    loading: state.loading,
    displayedProducts: state.displayedProducts
})

const mapDispatchToProps = dispatch => ({
    fetchData: () => dispatch({
        type: 'FETCH_DATA'
    }),
    getFilteredProducts: search => dispatch({
        type: "GET_FILTERED_PRODUCTS",
        search
    })
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(App));
