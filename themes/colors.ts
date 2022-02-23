import { extendTheme } from "@chakra-ui/react"

const Input: Record<string, any> = {
    variants: {
      outline: () => ({
        field: {
          borderColor: `#c4c4c4`,
          color: '#000000',
          bg: `white.100`,
          _hover: {
            bg: `white.100`
          },
          _focus: {
            bg: "white",
          }
        },
        addon: {
          bg: `white.100`
        }
      })
    }
};

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
            Input
    }
})

export default theme
