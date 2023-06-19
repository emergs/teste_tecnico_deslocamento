import '@/styles/globals.css'
import { MainTheme } from '@/theme'
import { ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={MainTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
