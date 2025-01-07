import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://asset.cloudinary.com/dyrev28qc/2addba88c7d36930297a58edfdb955a9"
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
