import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";
import theme from "../helpers/Themes";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* <meta
              name="description"
              content="A portal to check on Anudeep Chandra Paul's resume and skills. A serverless spa made by Anudeep Chandra Paul (ACP)."
            />
            <meta
              property="og:description"
              content="A portal to check on Anudeep Chandra Paul's resume and skills. A serverless spa made by Anudeep Chandra Paul (ACP)."
            /> */}
          <meta name="theme-color" color="#000" />
          <meta name="robots" content="all" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
          <link rel="manifest" href="/manifest.webmanifest" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body
          style={{
            margin: 0,
            fontSize: theme.rootFont,
            color: theme.colors.secondary,
            backgroundColor: theme.colors.primary,
            fontFamily: theme.font.fontFamily,
          }}
        >
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// export default MyDocument;
