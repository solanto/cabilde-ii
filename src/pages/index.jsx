// homepage

import { useStyletron } from "baseui"
import { Button } from "baseui/button"
import * as React from "react"

export const sum = (a, b) => a + b

const Index = () => {
    const [css, theme] = useStyletron()
    return (
        <>
            <Button onClick={() => console.log("hey")}>Hello</Button>
            <span className={css({ color: theme.colors.accent600 })}>
                Styled by hook
            </span>
        </>
    )
}

export default Index
