import '../styles/globals.css'
import type { AppProps } from 'next/app'

import Contexts from '../Context';
import { SessionProvider  } from 'next-auth/react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Contexts>
        <Component {...pageProps} />
      </Contexts>
    </SessionProvider>)
}

export default MyApp;


