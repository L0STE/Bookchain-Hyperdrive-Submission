import { AppProps } from 'next/app';
import Head from 'next/head';
import { FC } from 'react';
import { ContextProvider } from '../contexts/ContextProvider';
import { Navbar } from '../components/navbar';
require('@solana/wallet-adapter-react-ui/styles.css');
require('../styles/globals.css');

const App: FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <>
          <Head>
            <title>Bookchain</title>
          </Head>

          <ContextProvider>
            <div className="flex flex-col h-screen overflow-y-hidden">
                <Component {...pageProps} />
            </div>
          </ContextProvider>
        </>
    );
};

export default App;
