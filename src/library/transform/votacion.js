// transform a raw votacion data object into a object including proportional votes

import empty from "is-empty"

export default data => {
    if (!empty(data)) {
        const { aFavor, enContra, abstenido, ausente } = data

        const votingTotal = aFavor.length + enContra.length + abstenido.length
        const memberTotal = votingTotal + ausente.length

        const raw = {
            aFavor: aFavor.length,
            enContra: enContra.length,
            abstenido: abstenido.length,
            ausente: ausente.length,
            totals: {
                voting: votingTotal,
                members: memberTotal
            }
        }

        return {
            raw,
            proportional: {
                aFavor: raw.aFavor / votingTotal,
                enContra: raw.enContra / votingTotal,
                abstenido: raw.abstenido / votingTotal,
                ausente: raw.ausente / memberTotal
            }
        }
    } else return undefined
}
