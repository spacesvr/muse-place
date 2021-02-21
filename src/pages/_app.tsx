import { AppProps } from "next/app";
import Head from "next/head";
import { useEffect } from "react";

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    console.log(`
      ___           ___           ___           ___     
     /  /\\         /  /\\         /  /\\         /  /\\    
    /  /::|       /  /:/        /  /::\\       /  /::\\   
   /  /:|:|      /  /:/        /__/:/\\:\\     /  /:/\\:\\  
  /  /:/|:|__   /  /:/        _\\_ \\:\\ \\:\\   /  /::\\ \\:\\ 
 /__/:/_|::::\\ /__/:/     /\\ /__/\\ \\:\\ \\:\\ /__/:/\\:\\ \\:\\
 \\__\\/  /~~/:/ \\  \\:\\    /:/ \\  \\:\\ \\:\\_\\/ \\  \\:\\ \\:\\_\\/
       /  /:/   \\  \\:\\  /:/   \\  \\:\\_\\:\\    \\  \\:\\ \\:\\  
      /  /:/     \\  \\:\\/:/     \\  \\:\\/:/     \\  \\:\\_\\/  
     /__/:/       \\  \\::/       \\  \\::/       \\  \\:\\    
     \\__\\/         \\__\\/         \\__\\/         \\__\\/    

                      

                         made by Muse
                    https://muse.place/muse
                      we craft realities
    `);
  }, []);

  return (
    <>
      <Head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-9G528VLZNH"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
         window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-9G528VLZNH');
        `,
          }}
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@1,300&family=Space+Mono&display=swap"
          rel="stylesheet"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#11d2db" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
        <title>Muse</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;
