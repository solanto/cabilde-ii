// table of voters on an initiative

import * as React from "react"
import Phone from "../../../components/phone"
import Image from "next/image"
import renderName from "../name"
import phone from "../../transform/phone"
import { StyledLink as Link } from "baseui/link"
import slugify from "../../slugify/name"
import mapValues from "object.map"
import Vote from "../../../components/vote"
import ProfileLink from "../../../components/representante/profile-link"

const columns = [
    <span key="foto" aria-label="Foto"></span>,
    "Nombre",
    "Distrito eletoral",
    "Representación",
    "Partido",
    "Voto"
]

const render = data =>
    Object.values(
        mapValues(data, (reps, vote) =>
            reps.map(rep => ({ ...rep, votacion: vote }))
        )
    )
        .flat()
        .map(
            (
                { nombre, distrito, representacion, partido, votacion },
                index
            ) => [
                <Image
                    key={index}
                    src={`https://avatars.dicebear.com/api/bottts/${renderName.reversed(
                        nombre
                    )}.svg`}
                    width="80"
                    height="80"
                />,
                <ProfileLink key={index} {...{ nombre }} />,
                distrito,
                representacion,
                partido,
                <Vote key={index} token={votacion} />
            ]
        )

export default { render, columns }
