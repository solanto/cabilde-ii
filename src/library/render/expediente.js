// generate an expediente string from an expediente data object

import { convert as roman } from "roman-numeral"

export default ({ documento, congreso }) => `${documento}/${roman(congreso)}`
