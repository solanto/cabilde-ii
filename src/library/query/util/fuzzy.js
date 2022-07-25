// fuzzy searcher factory
// generate a fuzzy search handler that optionally preprocesses search terms and then searches for those terms through some object keys in the resource data object

import Fuse from "fuse.js"

export default (resource, keys, options = { preprocess: data => data }) =>
    async query => {
        const { preprocess, ...fuseOptions } = options

        const data = preprocess(await (await fetch(resource)).json()) // TODO: don't re-fetch on every call
        const fuse = new Fuse(data, { keys, ...fuseOptions })

        return query ? fuse.search(query).map(({ item }) => item) : data
    }
