import * as React from "react"
import { decompressFromEncodedURIComponent as decompress } from "lz-string"
import query from "../library/query/representante"
import { FormControl } from "baseui/form-control"
import { StatefulInput as Input } from "baseui/input"
import { Combobox } from "baseui/combobox"
import { StatefulTextarea as Textarea } from "baseui/textarea"
import { Card, StyledBody, StyledAction } from "baseui/card"
import { Button } from "baseui/button"
import { useStyletron } from "baseui"
import { Select, TYPE } from "baseui/select"
import debounce from "lodash.debounce"
import queryReps from "../library/query/representantes"
import slugifyName from "../library/slugify/name"
import renderName from "../library/render/name"
import QRCode from "qrcode-svg"
import Image from "next/image"

function maybeParse(json) {
    try {
        return JSON.parse(json)
    } catch (error) {
        if (error instanceof SyntaxError) return undefined
        else throw error
    }
}

/**
 * @type {import("next/types").GetServerSideProps}
 */
export const getServerSideProps = async ({
    req: request,
    res: response,
    resolvedUrl,
    query: { m: data }
}) => {
    const info = maybeParse(decompress(data))
    const url = "https://cabilde.org" + resolvedUrl

    const valid = info && (info.length == 2 || info.length == 3)

    return {
        props: {
            reps: (await queryReps()).map(({ nombre }) => ({
                name: renderName.reversed(nombre),
                slug: slugifyName(nombre)
            })),
            ...(valid
                ? {
                      subject: info[0],
                      message: info[1],
                      ...(info[2]
                          ? {
                                // if recipients available, query and include in prop
                                recipients: (
                                    await Promise.all(
                                        info[2].map(slug => query(slug))
                                    )
                                )
                                    .map((data, index) => [
                                        info[2][index],
                                        data
                                    ])
                                    .reduce(
                                        (recipients, recipient) =>
                                            recipient[1]
                                                ? [recipient, ...recipients]
                                                : recipients,
                                        []
                                    )
                                    .map(([slug, { nombre }]) => ({
                                        name: renderName.reversed(nombre),
                                        slug
                                    })),
                                qr:
                                    url.length <= 2331
                                        ? "data:image/svg+xml;base64," +
                                          Buffer.from(
                                              new QRCode({
                                                  content: url,
                                                  padding: 4,
                                                  width: 256,
                                                  height: 256,
                                                  color: "#000000",
                                                  background: "#ffffff",
                                                  ecl: "M"
                                              }).svg()
                                          ).toString("base64")
                                        : false
                            }
                          : undefined) // else, omit prop
                  }
                : {})
        }
    }
}

const Mensaje = ({ reps, recipients, subject, message, qr }) => {
    const [selectedReps, setSelectedReps] = React.useState(recipients)

    const handleOnClick = action =>
        function (event) {
            event.preventDefault()

            const data = new FormData(document.forms.mensaje)

            if (selectedReps)
                selectedReps.forEach(function ({ slug }) {
                    data.append("recipientes", slug)
                })

            fetch("/api/mensaje", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    action,
                    sujeto: data.get("sujeto"),
                    mensaje: data.get("mensaje"),
                    recipientes: data.getAll("recipientes")
                })
            }).then(function ({ url }) {
                window.location.href = url
            })
        }

    const repOptions = reps.map(({ name, slug }, index) => (
        <option
            key={`r-opt-${index}`}
            value={slug}
            selected={Boolean(
                recipients &&
                    recipients.find(({ slug: candidate }) => candidate == slug)
            )}
        >
            {name}
        </option>
    ))

    return (
        <>
            <form action="/api/mensaje" method="POST" id="mensaje">
                {/* TODO: connnect labels to form elements */}
                <div className="rep-select">
                    <FormControl label="Recipientes" htmlFor="recipientes">
                        <Select
                            options={reps}
                            labelKey="name"
                            valueKey="slug"
                            placeholder="Quiero hablar con…"
                            maxDropdownHeight="300px"
                            type={TYPE.search}
                            multi
                            onChange={({ value }) => setSelectedReps(value)}
                            value={selectedReps}
                            overrides={
                                /** @type {import("baseui/select").SelectOverrides} */ {
                                    Input: {
                                        props: {
                                            id: "recipientes"
                                        }
                                    }
                                }
                            }
                        />
                    </FormControl>
                </div>
                <noscript>
                    <FormControl
                        label="Recipientes"
                        htmlFor="recipientes"
                        caption={
                            <>
                                Selecciona múltiples por mantener pulsada la
                                tecla <kbd>ctrl</kbd> (<kbd>cmd</kbd> en
                                aparatos Apple).
                            </>
                        }
                    >
                        <select multiple name="recipientes">
                            {repOptions}
                        </select>
                    </FormControl>

                    <style>{`.rep-select { display: none }`}</style>
                    {/* TODO: mount react component atop element instead of keeping both alternatives in the document */}
                </noscript>
                <FormControl label="Sujeto">
                    <Input
                        name="sujeto"
                        placeholder="sobre…"
                        initialState={{ value: subject }}
                    />
                </FormControl>
                <FormControl label="Mensaje">
                    <Textarea
                        name="mensaje"
                        placeholder="diciendo…"
                        initialState={{ value: message }}
                    />
                </FormControl>
                <Card>
                    <StyledBody>
                        ¡Comparte este código para darles este mensage como
                        plantilla a tus amigos!
                        {subject ? (
                            qr ? (
                                <Image
                                    src={qr}
                                    alt=""
                                    width="256"
                                    height="256"
                                    priority
                                />
                            ) : (
                                <p>
                                    Mensaje demasiado grande para hacer un
                                    código QR
                                </p>
                            )
                        ) : undefined}
                    </StyledBody>
                    <StyledAction>
                        <Button
                            type="submit"
                            name="action"
                            value="share"
                            onClick={handleOnClick("share")}
                        >
                            Genera un enlace de compartir
                        </Button>
                    </StyledAction>
                </Card>
                <Button
                    type="submit"
                    name="action"
                    value="send"
                    onClick={handleOnClick("send")}
                >
                    Envía mi mensaje
                </Button>
            </form>
        </>
    )
}

export default Mensaje
