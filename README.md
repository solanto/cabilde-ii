# Nextjs + Base Web + TypeScript

This is an opinionated scaffold of Next.js and Base Web. It comes with:

- Nextjs
- Base Web
- Styletron
- Jest
- Eslint
- Prettier
- TypeScript

# getting started

## install dependencies

```powershell
npm i
```

## hosting

<https://vercel.com/>

# cabilde design considerations

- prioritize server-side data processing & view generation
- offer richer javascript-based interaction as a *bonus* to useful server-generated documents
    - webpages should be useful even without client-side js wherever possible
        - if (when) things break, they should still serve the user
    - webpages should be useful without css wherever possible
        - reasoning above
    - effectively, avoid the messy "web app" design currently offered by mx gov
- value accessible (e.g. [semantic](https://developer.mozilla.org/en-US/docs/Glossary/Semantics#semantics_in_html)) document design & implementation