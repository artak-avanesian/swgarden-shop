import React from 'react'
import { InputGroup, FormControl } from 'react-bootstrap'

const SearchField = ({
    value,
    valueChangeHandler,
    handlerKeyPress
}) => (
    <InputGroup className="mb-3 mt-4">
        <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            placeholder="Product name"
            value={value}
            onChange={valueChangeHandler}
            onKeyPress={handlerKeyPress}
        />
    </InputGroup>
)

export default SearchField