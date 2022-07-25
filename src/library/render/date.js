// format a raw date as a human-readable date

import Intl from "intl"
import "intl/locale-data/jsonp/es-MX"

export default raw => new Intl.DateTimeFormat("es-MX").format(new Date(raw))
