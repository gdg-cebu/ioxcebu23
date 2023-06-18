import { useEffect } from 'react';
import { useRouter } from 'next/router';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import '../styles/globals.css';

import type { AppProps } from 'next/app';

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    nprogress.configure({ showSpinner: false });
    const handleRouteChangeStart = () => nprogress.start();
    const handleRouteChangeComplete = () => nprogress.done();
    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  });

  return <Component {...pageProps} />;
}

export default App;
