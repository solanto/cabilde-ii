// preprocessing for any rep's data entries

import slugify from "../slugify/name"

const resource =
    "https://raw.githubusercontent.com/solanto/cabildummy-datos/master/diputados.json"

export default async (slug, fallback) =>
    (await (await fetch(resource)).json()).filter(
        ({ nombre }) => slug == slugify(nombre)
    )[0] || fallback
