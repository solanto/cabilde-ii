// search handler for reps

import query from "./util/fuzzy"

export default query(
    "https://raw.githubusercontent.com/solanto/cabildummy-datos/master/diputados.json",
    ["nombre.nombre", "nombre.apellidos", "partido", "distrito", "comisiones"]
)
