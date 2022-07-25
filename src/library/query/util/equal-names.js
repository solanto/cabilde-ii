// test whether two name strings refer to the same rep

import slugify from "slugify"
import render from "../../render/name"

const slugifyName = nombre => slugify(render(nombre), { lower: true })

export default (a, b) => slufigyName(a) == slugifyName(b)
