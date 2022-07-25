// generate a name slug from a rep nombre object

import slugify from "slugify"
import render from "../render/name"

export default nombre => slugify(render(nombre), { lower: true })
