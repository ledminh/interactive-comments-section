import '../styles/globals.css'
import type { AppProps } from 'next/app'

import Contexts from '../Context';
import { SessionProvider  } from 'next-auth/react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Contexts>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </Contexts>)
}

export default MyApp;


