import React from 'react'
import { InputGroup, FormControl } from 'react-bootstrap'

const SearchField = ({
    value,
    valueChangeHandler,
    handlerKeyPress
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
    </InputGroup>
)

export default SearchField