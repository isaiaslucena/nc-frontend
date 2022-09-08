import { useContext, useEffect } from 'react'
import { Html, Head, Main, NextScript } from 'next/document'
import { AppContext } from '../src/context/appContext'

const CustomDocument = () => {
  return (
    <>
      <Html>
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    </>
  )
}

export default CustomDocument
