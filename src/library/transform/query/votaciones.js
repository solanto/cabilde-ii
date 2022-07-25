// preprocess voted initiative data on initial fetch

import renderExpediente from "../../render/expediente"
import renderDate from "../../render/date"
import transformVotacion from "../votacion"

export default data =>
    data.map(
        ({ expediente, fecha: { iniciada, radicada }, votacion, ...rest }) => ({
            original: {
                // original data object
                expediente,
                fecha: { iniciada, radicada },
                votacion,
                ...rest
            },
            friendly: {
                // often-used transforms of the data for convenience
                expediente: renderExpediente(expediente),
                fecha: {
                    iniciada: renderDate(iniciada),
                    radicada: renderDate(radicada)
                },
                votacion: transformVotacion(votacion)
            }
        })
    )
