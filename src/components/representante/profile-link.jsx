// rich link to a rep's profile

import { StyledLink as Link } from "baseui/link"
import * as React from "react"
import renderName from "../../library/render/name"
import slugify from "../../library/slugify/name"

const ProfileLink = ({ nombre, reversed = true, ...props }) => (
    <Link href={`/representantes/${slugify(nombre)}`} {...props}>
        {reversed ? renderName.reversed(nombre) : renderName(nombre)}
    </Link>
)

export default ProfileLink
