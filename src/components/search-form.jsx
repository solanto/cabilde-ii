// custom search using the html form standard
// works without client-side javascript

import * as React from "react"
import { FormControl } from "baseui/form-control"
import { Input, SIZE } from "baseui/input"
import { Search } from "baseui/icon"
import { Button, KIND } from "baseui/button"

const SearchForm = ({ value: initial = "", ...props }) => {
    const [value, setValue] = React.useState(initial)

    return (
        <form>
            <FormControl id="busqueda">
                <Input
                    value={value}
                    onChange={event => setValue(event.currentTarget.value)}
                    name="busqueda"
                    size={SIZE.large}
                    placeholder="Busca aquí"
                    clearOnEscape
                    positive={value && value == initial}
                    endEnhancer={
                        <Button kind={KIND.minimal}>
                            <Search />
                        </Button>
                    }
                    type="search"
                    {...{ ...props }}
                />
            </FormControl>
        </form>
    )
}
export default SearchForm
