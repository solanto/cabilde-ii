// rich vote indicator

import { Tag } from "baseui/tag"
import * as React from "react"

const mappings = {
    aFavor: {
        kind: "positive",
        children: "a favor"
    },
    enContra: {
        kind: "negative",
        children: "en contra"
    },
    abstenido: {
        kind: "warning",
        children: "abstenido"
    },
    ausente: {
        kind: "accent",
        children: "ausente"
    }
}

const fallback = {
    kind: "neutral",
    children: "desconocido"
}

const Vote = ({ token, ...props }) => (
    <Tag {...(mappings[token] || fallback)} closeable={false} {...props} />
)

export default Vote
