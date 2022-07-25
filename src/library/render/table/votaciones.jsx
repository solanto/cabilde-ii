// table of voted initiatives

import * as React from "react"
import transform from "../../transform/query/votaciones"
import { ProgressBarRounded as ProgressBar, SIZE } from "baseui/progress-bar"
import { StyledLink } from "baseui/link"

const columns = [
    "Asunto",
    "Expediente",
    "Fecha iniciada",
    "Fecha radicada",
    "Votación a favor"
]

const render = data =>
    transform(data).map(
        (
            {
                original: { asunto },
                friendly: {
                    expediente,
                    fecha: { iniciada, radicada },
                    votacion
                }
            },
            index
        ) => {
            return [
                asunto,
                <StyledLink key={index} href={`/votaciones/${expediente}`}>
                    {expediente}
                </StyledLink>,
                iniciada,
                radicada,
                votacion ? (
                    <ProgressBar
                        progress={votacion.proportional.aFavor}
                        animate={false}
                    />
                ) : (
                    <span>pendiente</span>
                )
            ]
        }
    )

export default { render, columns }
