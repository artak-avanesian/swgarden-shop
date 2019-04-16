import React, { Component } from 'react';
import { Container, Row, Col} from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { Switch, Route } from 'react-router'
import Menu from './Menu/Menu';
import DisplayedProducts from './DisplayedProducts/DisplayedProducts';
import SearchProducts from './SearchProducts/SearchProducts';
import { connect } from 'react-redux';
import SearchField from './SearchField/SearchField';
import Loader from './Loader/Loader'
import queryString from 'querystring'
import PropTypes from "prop-types";

class App extends Component {

    state = {
        value: '',
        search: '',
    }

    componentDidMount() {
        const { location } = this.props
        if (location.search) {
            this.setState({
                value: queryString.parse(location.search)['?name']
            })
            this.setSearch()
        } 
        this.props.fetchData()
    }


    valueChangeHandler = event => {
        this.setState({
            value: event.target.value
        })

        const { history } = this.props

        history.push({
            search: this.state.value.length > -1 ? '' + new URLSearchParams({ name: event.target.value }) : null
        })
    }

    setSearch = () => {
        this.setState(prevState => ({
            search: prevState.value
        }))
    } 

    handlerKeyPress = event => {
        const { location } = this.props
        if (event.key === 'Enter' && this.state.value) {
            this.setSearch()
            location.pathname = '/search'
        }
    }

    render() {

        const {
            loading,
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
                        <Switch>
                            <Route exact path='/' component={DisplayedProducts}/>
                            <Route path='/search' render={() => <SearchProducts
                                searchStr={this.state.search}
                            />}/>
                            <Route path='/category/:categoryName' component={DisplayedProducts}/>
                        </Switch>
                    </Col>
                </Row>
            </Container>
        );
    }
}

App.propTypes = {
    categories: PropTypes.array,
    loading: PropTypes.bool,
    getFilteredProducts: PropTypes.func,
    fetchData: PropTypes.func
}


const mapStateToProps = state => ({
    categories: state.categories,
    loading: state.loading,
})

const mapDispatchToProps = dispatch => ({
    fetchData: () => dispatch({
        type: 'FETCH_DATA'
    }),
    getFilteredProducts: searchWord => dispatch({
        type: "GET_FILTERED_PRODUCTS_BY_SEARCH_WORD",
        searchWord
    })
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(App));
