import React from 'react'
import { InputGroup, FormControl, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const SearchField = ({
    value,
    valueChangeHandler,
    handlerKeyPress,
    onSearch
}) => (
    <InputGroup className="mb-3 mt-4">
        <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            placeholder="Product name"
            value={value}
            onChange={valueChangeHandler}
            onKeyPress={handlerKeyPress}
        />
        <InputGroup.Append>
            <Link to='/search'>
                <Button 
                    variant="secondary"
                    onClick={() => onSearch(value)}
                    disabled={!value}
                >
                    Search
                </Button>
            </Link>
        </InputGroup.Append>
    </InputGroup>
)

export default SearchField