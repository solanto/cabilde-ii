// app scaffolding

import React from "react"
import App from "next/app"
import { Provider as StyletronProvider } from "styletron-react"
import { LightTheme, BaseProvider } from "baseui"
import { styletron } from "../styletron"
import Navigation from "../components/navigation"
import { LocaleProvider } from "baseui"
import locale from "../library/locale"

export default class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props
        return (
            <StyletronProvider value={styletron}>
                <LocaleProvider {...{ locale }}>
                    <BaseProvider theme={LightTheme}>
                        <Navigation />
                        <Component {...pageProps} />
                    </BaseProvider>
                </LocaleProvider>
            </StyletronProvider>
        )
    }
}
