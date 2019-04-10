import React, { Component } from 'react';
import './App.css'

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
        <div className="app">
            <input 
                type='text'
                value={this.state.value}
                onChange={this.valueChangeHandler}
                onKeyPress={this.handlerKeyPress}
                placeholder='Product name'
            />
            <section>
            {
                this.search().length === 0 && this.state.search ? 
                <p>Products with the same name is missing. Please, try again.</p> 
                : this.search().map((item) => (
                    <div key={item.asin + item.name} className='item'>
                        <a href={item.link} className='name' title={item.name}>{item.name} </a>
                        <img src={item.img} alt="" width='200' height="200"/>
                        <p><span className='bold'>Price:</span> {item.price} &#163;</p>
                    </div>
                ))
            }
            </section>
        </div>
        );
    }
}

export default App;
