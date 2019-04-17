import React from 'react'
import { InputGroup, FormControl } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import PropTypes from "prop-types";

const SearchField = ({
    value,
    valueChangeHandler,
    handlerKeyPress,
    routeToSearch,
    location
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
            onFocus={() => routeToSearch(location)}
        />
    </InputGroup>
)

SearchField.propTypes = {
    value: PropTypes.string,
    valueChangeHandler: PropTypes.func,
    handlerKeyPress: PropTypes.func
}

export default withRouter(SearchField)