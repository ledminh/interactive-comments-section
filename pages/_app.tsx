import '../styles/globals.css'
import type { AppProps } from 'next/app'

import Contexts from '../Context';

function MyApp({ Component, pageProps }: AppProps) {
  return <Contexts><Component {...pageProps} /></Contexts>
}

export default MyApp