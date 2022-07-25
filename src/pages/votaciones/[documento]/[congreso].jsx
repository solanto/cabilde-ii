// initiative detail page
// url is just /votaciones/[expediente] where [expediente] is [documento]/[congreso]

import { useStyletron } from "baseui"
import { ListItem, ListItemLabel } from "baseui/list"
import { Table } from "baseui/table-semantic"
import { H1, H2, H3 } from "baseui/typography"
import empty from "is-empty"
import Error from "next/error"
import mapValues from "object.map"
import promisedValues from "p-props"
import * as React from "react"
import { Cell, Pie, PieChart } from "recharts"
import Vote from "../../../components/vote"
import queryRep from "../../../library/query/representante"
import query from "../../../library/query/votacion"
import renderExpediente from "../../../library/render/expediente"
import table from "../../../library/render/table/votantes"
import slugify from "../../../library/slugify/name"
import voteStats from "../../../library/transform/votacion"

export const getServerSideProps = async ({
    params: { documento, congreso }
}) => {
    const match = (await query(`${documento}/${congreso}`))[0]
    const votacion = match ? match.data : false

    return {
        props: {
            votacion,
            votantes: await promisedValues(
                mapValues(votacion.votacion, reps =>
                    Promise.all(
                        reps.map(nombre =>
                            queryRep(slugify(nombre), { nombre })
                        )
                    )
                )
            )
        }
    }
}

const Content = ({ votacion, votantes }) => {
    if (empty(votacion.votacion)) {
        // pending
        return "pendiente"
    } else {
        // data available
        const stats = voteStats(votacion.votacion)

        const chartData = [
            { name: "a favor", value: stats.raw.aFavor },
            { name: "en contra", value: stats.raw.enContra },
            { name: "abstenido", value: stats.raw.abstenido }
        ]

        const [, theme] = useStyletron()
        const chartColors = [
            theme.colors.positive300,
            theme.colors.negative400,
            theme.colors.warning400
        ]

        const statDetails = {
            aFavor: {
                ariaLabel: "A favor:",
                total: "voting"
            },
            enContra: {
                ariaLabel: "En contra:",
                total: "voting"
            },
            abstenido: {
                ariaLabel: "Abstenido:",
                total: "voting"
            },
            ausente: {
                ariaLabel: "Ausente:",
                total: "members"
            }
        }

        return (
            <>
                <section>
                    <H3>Votación en resumen</H3>
                    <PieChart width={160} height={160}>
                        <Pie
                            data={chartData}
                            innerRadius={50}
                            outerRadius={80}
                            dataKey="value"
                        >
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={chartColors[index]}
                                />
                            ))}
                        </Pie>
                    </PieChart>
                    <ul>
                        {Object.entries(statDetails).map(
                            ([token, { ariaLabel, total }], index) => (
                                <ListItem key={index}>
                                    <ListItemLabel>
                                        <span aria-label={ariaLabel}>
                                            <Vote {...{ token }} />
                                        </span>
                                        {stats.raw[token]}/
                                        {stats.raw.totals[total]} (
                                        {Math.round(
                                            stats.proportional[token] * 100
                                        )}
                                        %)
                                    </ListItemLabel>
                                </ListItem>
                            )
                        )}
                    </ul>
                </section>
                <section>
                    <H3>Votos por representante</H3>
                    <Table
                        columns={table.columns}
                        data={table.render(votantes)}
                    />
                </section>
            </>
        )
    }
}

const Votacion = ({ votacion, votantes }) => {
    if (!votacion) {
        // bad url
        return <Error statusCode="404" />
    } else {
        const { expediente, asunto } = votacion

        return (
            <>
                {JSON.stringify(votacion)}
                <hgroup>
                    <H1>Expediente {renderExpediente(expediente)}</H1>
                    <H2>{asunto}</H2>
                </hgroup>
                <Content {...{ votacion, votantes }} />
            </>
        )
    }
}

export default Votacion
