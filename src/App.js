import React, { Component } from 'react';
import { Container, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap'
import { Route, Link } from 'react-router-dom'
import Menu from './Menu/Menu';
import { uniq } from 'lodash'
import DisplayedProducts from './DisplayedProducts/DisplayedProducts';
import SearchProducts from './SearchProducts/SearchProducts';

class App extends Component {

    state = {
        value: '',
        search: '',
        products: [],
        displayedProducts: [],
    }

    componentDidMount() {
        fetch('http://localhost:3000/products.json')
            .then(response => response.json())
            .then(response => {
                this.setState({
                    products: response.products
                })
                this.setState(prevState => ({
                    categories: prevState.products.map(item => item.bsr_category)
                }))
            })
            
    }

    valueChangeHandler = event => {
        this.setState({
            value: event.target.value
        })
    }

    handlerKeyPress = event => {
        if (event.key === 'Enter' && this.state.value) {
            this.onSearch(this.state.value)
            //window.location.pathname = '/search'
        }
    }

    onSearch = search => {
        this.setState({
            search
        })
    }

    getFilteredProducts = () => {

        const {search} = this.state

        if (!search) return []

        return this.state.products.filter((item) => {
            return item.name.toLowerCase().includes(search.toLowerCase())
        })
    }

    changeCategory = (category) => {
        this.setState(prevState => ({
            displayedProducts: prevState.products.filter((item) => item.bsr_category === category)
        }))
    } 

    render() {

        const filteredProducts = this.getFilteredProducts()

        return (
            <Container>
                <Row>
                    <Col>
                        <InputGroup className="mb-3 mt-4">
                            <FormControl
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                                placeholder="Product name"
                                value={this.state.value}
                                onChange={this.valueChangeHandler}
                                onKeyPress={this.handlerKeyPress}
                            />
                            <InputGroup.Append>
                                <Link to='/search'>
                                    <Button 
                                        variant="secondary"
                                        onClick={() => this.onSearch(this.state.value)}
                                        disabled={!this.state.value}
                                    >
                                        Search
                                    </Button>
                                </Link>
                            </InputGroup.Append>
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col lg={2}>
                        <Menu
                            categories={uniq(this.state.categories)}
                            changeCategory={this.changeCategory}
                        />
                    </Col>
                    <Col lg={10}>
                        <Route exact path='/' render={() => <DisplayedProducts
                            displayedProducts={this.state.products}
                        />}/>
                        <Route path='/search' render={() => <SearchProducts
                            filteredProducts={filteredProducts}
                            searchStr={this.state.search}
                        />}/>
                        {
                            uniq(this.state.categories).map((item, index) => (
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

export default App;
