// navigation bar

import { useStyletron } from "baseui"
import { AppNavBar, setItemActive } from "baseui/app-nav-bar"
import { ChevronDown, Delete, Upload } from "baseui/icon"
import { StyledLink as Link } from "baseui/link"
import * as React from "react"

const Navigation = () => {
    // nav items in component state so they can be hotswapped
    const [mainItems, setMainItems] = React.useState([
        { icon: Upload, label: "Representantes", href: "/representantes" },
        {
            icon: Upload,
            label: "Votaciones e iniciativas",
            href: "/votaciones"
        },
        { icon: Upload, label: "Mensaje", href: "/mensaje" },
        {
            // active: true,
            icon: ChevronDown,
            label: "Aprende más",
            navExitIcon: Delete,
            children: [
                { icon: Upload, label: "Educación cívica" },
                { icon: Upload, label: "Gobierno abierto" },
                { icon: Upload, label: "Política de datos abiertos" }
            ]
        }
    ])

    const [css] = useStyletron()

    return (
        <AppNavBar
            title={
                <Link
                    href="/"
                    className={css({ textDecoration: "none !important" })}
                >
                    Cabilde // logo here eventually
                </Link>
            }
            mainItems={mainItems}
            onMainItemSelect={item => {
                setMainItems(prev => setItemActive(prev, item))
            }}
            // user session indicator from sample navbar code
            // username="Umka Marshmallow"
            // usernameSubtitle="5 Stars"
            // userItems={[
            //     { icon: Overflow, label: "User A" },
            //     { icon: Overflow, label: "User B" }
            // ]}
            // onUserItemSelect={item => console.log(item)}
            overrides={{
                PrimaryMenuContainer: { // custom nav links
                    component: ({ children }) => (
                        <div
                            role="navigation"
                            className={css({
                                height: "100%",
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "center"
                            })}
                        >
                            {children.map(
                                (
                                    {
                                        props: {
                                            item: {
                                                icon,
                                                label,
                                                className,
                                                ...attributes
                                            }
                                        }
                                    },
                                    index
                                ) => (
                                    <Link
                                        key={index}
                                        {...attributes}
                                        className={[
                                            ...(className || []),
                                            css({
                                                height: "100%",
                                                marginLeft: "1em",
                                                display: "flex",
                                                justifyContent: "center"
                                            })
                                        ]}
                                    >
                                        <span
                                            className={css({
                                                margin: "auto"
                                            })}
                                        >
                                            {label}
                                        </span>
                                    </Link>
                                )
                            )}
                        </div>
                    )
                }
            }}
        />
    )
}

export default Navigation
