import {SnackbarProvider} from 'notistack'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { lightTheme } from '../themes';
import { darkTheme } from '../themes/dark-theme';
import { UIProvider } from '../context/ui';
import { EntriesProvider } from '../context/entries';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider maxSnack={3}>
      <EntriesProvider>
        <UIProvider>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </UIProvider>
      </EntriesProvider>
    </SnackbarProvider>
  )
}

export default MyApp
