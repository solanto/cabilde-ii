// parent layout for map & table mode of rep search form

import * as React from "react"
import { Button } from "baseui/button"
import { StatefulButtonGroup, MODE } from "baseui/button-group"
import { Card, StyledBody, StyledAction } from "baseui/card"
import { Label1, Paragraph1 } from "baseui/typography"

const Layout = ({ children, tablaLabel, mapaLabel, selected }) => (
    <>
        <Card>
            <StyledBody>
                <Label1>
                    Conocer quién te representa es el primer paso para tomar
                    acción.
                </Label1>
                <Paragraph1>
                    Puedes localizar a tus representantes en el Congreso Local
                    ingresando tu sección eletoral u otro término de búsqueda en
                    nuestra tabla, o tu dirección en nuestro mapa interactivo.
                </Paragraph1>
            </StyledBody>
            <StyledAction>
                <StatefulButtonGroup
                    mode={MODE.radio}
                    initialState={{
                        selected:
                            selected == "tabla"
                                ? 0
                                : selected == "mapa"
                                ? 1
                                : undefined
                    }}
                >
                    <Button $as="a" href="/representantes">
                        {tablaLabel}
                    </Button>
                    <Button $as="a" href="/representantes/mapa">
                        {mapaLabel}
                    </Button>
                </StatefulButtonGroup>
            </StyledAction>
        </Card>
        {children}
    </>
)

export default Layout
