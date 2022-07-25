// table of reps

import * as React from "react"
import Phone from "../../../components/phone"
import Image from "next/image"
import renderName from "../name"
import phone from "../../transform/phone"
import { StyledLink as Link } from "baseui/link"
import slugify from "../../slugify/name"

const columns = [
    <span key="foto" aria-label="Foto"></span>,
    "Nombre",
    "Sección eletoral",
    "Distrito eletoral",
    "Partido",
    "Comisiones",
    "Teléfono"
]

const render = data =>
    data.map(
        (
            {
                nombre,
                seccion,
                distrito,
                partido,
                comisiones,
                contacto: { telefono }
            },
            index
        ) => {
            const name = renderName.reversed(nombre)

            return [
                <Image
                    key={index}
                    src={`https://avatars.dicebear.com/api/bottts/${name}.svg`}
                    width="80"
                    height="80"
                />,
                <Link key={index} href={`/representantes/${slugify(nombre)}`}>
                    {name}
                </Link>,
                seccion,
                distrito,
                partido,
                comisiones.join(", "),
                <Phone key={index} {...phone(telefono)} />
            ]
        }
    )

export default { render, columns }
