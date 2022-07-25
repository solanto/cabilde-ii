// rep detail page

import * as React from "react"
import query from "../../library/query/representante"

export const getServerSideProps = async ({
    params: { "name-slug": nameSlug }
}) => ({ props: { rep: await query(nameSlug) } })

const Representante = ({ rep }) => JSON.stringify(rep)

export default Representante
