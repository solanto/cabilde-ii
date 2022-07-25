// handle mensaje submissions server-side

import { compressToEncodedURIComponent as compress } from "lz-string"
import whitespace from "is-whitespace"
import empty from "is-empty"
import mail from "mailto-link"
import query from "../../library/query/representante"

/**
 * @type {import("next/dist/shared/lib/utils").NextApiHandler}
 */
export default async function handler(request, resolve) {
    const { action, sujeto: subject, mensaje: message } = request.body

    const recipients = [].concat(request.body.recipientes)

    if (action == "share") {
        if (
            (!subject || whitespace(subject)) &&
            (!message || whitespace(message)) &&
            (!recipients || empty(recipients))
        ) {
            resolve.redirect(303, "/mensaje")
        } else {
            const data = compress(
                JSON.stringify([
                    subject,
                    message,
                    ...(!recipients || whitespace(recipients)
                        ? []
                        : [recipients])
                ])
            )

            resolve.redirect(303, `/mensaje?m=${data}`)
        }
    } else if (action == "send") {
        // const to = (await Promise.all(recipients.map(slug => query(slug)))).map(
        //     ({ contacto: { correoElectronico } }) => correoElectronico
        // )

        resolve.redirect(
            303,
            mail({
                to: "a@b.com",
                subject,
                body: message
            })
        )
    } else resolve.status(400)
}
