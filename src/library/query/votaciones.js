// search handler for votes

import query from "./util/fuzzy"

export default query(
    "https://raw.githubusercontent.com/solanto/cabildummy-datos/master/iniciativas.json",
    [
        "asunto",
        "fecha.iniciada",
        "fecha.radicada",
        "expediente.congreso",
        "expediente.documento"
    ]
)
