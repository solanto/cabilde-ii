// render a rep's name from a nombre data object

const render = ({ nombre, apellidos }) => `${nombre} ${apellidos}`

export const renderReversed = ({ nombre, apellidos }) =>
    `${apellidos}, ${nombre}`

render.reversed = renderReversed

export default render
