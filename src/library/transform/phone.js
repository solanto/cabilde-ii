// transform raw phone number into an object containing a call link and a label

import parsePhoneNumber from "libphonenumber-js"

export default raw => {
    const parsed = parsePhoneNumber(raw, "MX")

    return {
        href: parsed.format("RFC3966"),
        label: parsed.formatNational()
    }
}
