// search handler for vote iniciative data

import query from "./util/fuzzy"
import renderExpediente from "../render/expediente"

export default query(
    "https://raw.githubusercontent.com/solanto/cabildummy-datos/master/iniciativas.json",
    ["route"],
    {
        threshold: 0,
        preprocess: data =>
            data.map(({ expediente, ...rest }) => ({
                route: renderExpediente(expediente),
                data: { expediente, ...rest }
            }))
    }
)
