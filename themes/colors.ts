import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
    colors: {
        primary: {
            black: '#000',
            white: '#fff',
            gray: '#C4C4C4',
            'green': '#7FD6A4',
            purple: '#735FED',
            500: '#7FD6A4',
        },
    },
    // colors: {
    //     transparent: 'transparent',
    //     black: '#000',
    //     white: '#fff',
    //     gray: 'C4C4C4',
    //     green: '7FD6A4',
    //     purple: '735FED',
    // },
})

export default theme