// vote iniciative search

import * as React from "react"
import query from "../../library/query/votaciones"
import render from "../../library/render/table/votaciones"
import dataSearch from "../../templates/data-search"

const { scaffoldServerSideProps, DataSearch } = dataSearch(render, query)

export const getServerSideProps = scaffoldServerSideProps()

const Votaciones = ({ dataSearch }) => <DataSearch state={dataSearch} />

export default Votaciones
