import React, { Component } from 'react';
import './App.css'
import { Container, Row, Col, InputGroup, FormControl, Card } from 'react-bootstrap'

class App extends Component {

    state = {
        value: '',
        search: '',
        products: []
    }

    componentDidMount() {
        fetch('http://localhost:3000/products.json')
            .then(response => response.json())
            .then(response => {
                this.setState({
                    products: response.products
                })
            })
    }

    valueChangeHandler = event => {
        this.setState({
            value: event.target.value
        })
    }

    handlerKeyPress = event => {
        if (event.key === 'Enter' && this.state.value) {
            this.setState(prevState => ({
                search: prevState.value
            }))
            this.setState({
                value: ''
            })
        }
    }

    search() {
        return this.state.products.filter((item) => {
            return item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1
        })
    }

    render() {
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
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    {
                        this.search().length === 0 && this.state.search ? 
                        <p>Products with the same name is missing. Please, try again.</p> 
                        : this.search().map((item) => (
                            <Card key={item.asin} style={{width: '16rem'}}>
                                <Card.Body>
                                    <Card.Title>
                                        <a href={item.link} className='name' title={item.name}>{item.name} </a>
                                    </Card.Title>
                                </Card.Body>
                                <Card.Img variant="top" src={item.img} alt={item.name} height='200'/>
                                <Card.Body>
                                    <Card.Text>
                                        <span className='bold'>Price:</span> {item.price} &#163;
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        ))
                    }
                </Row>
            </Container>
        );
    }
}

export default App;
