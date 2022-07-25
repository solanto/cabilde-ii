// initial rep search page (table mode)

import * as React from "react"
import query from "../../library/query/representantes"
import render from "../../library/render/table/representantes"
import dataSearch from "../../templates/data-search"
import Layout from "../../components/representantes/index-layout"

const { scaffoldServerSideProps, DataSearch } = dataSearch(render, query)

export const getServerSideProps = scaffoldServerSideProps()

const Representantes = props => (
    <Layout tablaLabel="Tabla" mapaLabel="Cambia al mapa" selected="tabla">
        <DataSearch state={props.dataSearch} />
    </Layout>
)

export default Representantes
