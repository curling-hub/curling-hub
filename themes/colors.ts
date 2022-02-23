import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
    colors: {
        primary: {
            'black': '#000',
            'white': '#fff',
            'gray': '#C4C4C4',
            'green': '#7FD6A4',
            'purple': '#735FED',
        },
    },
    components: {
        Button: {
            variants: {
                'white': {
                    bg: 'white',
                    textColor: 'black'
                }
            }
        }
    }
})

export default theme
