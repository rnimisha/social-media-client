
import { extendTheme,  } from '@chakra-ui/react'
import "@fontsource/lato/100.css";
import "@fontsource/lato/300.css";
import "@fontsource/lato/400.css";
import "@fontsource/lato/700.css";


const colors = {
    primary: {
      100: '#BDCDD6',
      200: '#93BFCF',
      300: '#6096B4',
    },
    complement:{
        100:'#EEE9DA'
    }
}

const fonts = {
    heading: `'Lato', sans-serif`,
    body: `'Lato', sans-serif`,
}

const styles = {
    global: {
      'html, body': {
        color: '#141D2B',
      },
      a: {
        color: 'teal.500',
      },
    },
  
}

export const theme = extendTheme({ styles, colors, fonts })

