// clickable phone number

import * as React from "react"
// import Link from "next/link" // TODO: override Link component to incorporate StyledLink (https://baseweb.design/guides/understanding-overrides)
import { StyledLink } from "baseui/link"

const Phone = ({ href, label }) => <StyledLink href={href}>{label}</StyledLink>

export default Phone
