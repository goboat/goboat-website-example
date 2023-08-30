import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  /* For browsers that don't support variable fonts */
  @supports not (font-variation-settings: normal) {
    @font-face {
      font-family: 'Montserrat-Light';
      font-display: fallback;
      src: url('/fonts/Montserrat-Light.woff2') format('woff2'),
        url('/fonts/Montserrat-Light.woff') format('woff');
      font-weight: 300;
      font-style: normal;
      text-rendering: optimizeLegibility;
    }

    @font-face {
      font-family: 'Montserrat-Regular';
      font-display: fallback;
      src: url('/fonts/Montserrat-Regular.woff2') format('woff2'),
        url('/fonts/Montserrat-Regular.woff') format('woff');
      font-weight: 400;
      font-style: normal;
      text-rendering: optimizeLegibility;
    }

    @font-face {
      font-family: 'Montserrat-Medium';
      font-display: fallback;
      src: url('/fonts/Montserrat-Medium.woff2') format('woff2'),
        url('/fonts/Montserrat-Medium.woff') format('woff');
      font-weight: 500;
      font-style: normal;
      text-rendering: optimizeLegibility;
    }

    @font-face {
      font-family: 'Montserrat-SemiBold';
      font-display: fallback;
      src: url('/fonts/Montserrat-SemiBold.woff2') format('woff2'),
        url('/fonts/Montserrat-SemiBold.woff') format('woff');
      font-weight: 600;
      font-style: normal;
      text-rendering: optimizeLegibility;
    }

    @font-face {
      font-family: 'Inter-Regular';
      font-display: fallback;
      src: url('/fonts/Inter-Regular.woff2') format('woff2'),
        url('/fonts/Inter-Regular.woff') format('woff');
      font-weight: 400;
      font-style: normal;
      text-rendering: optimizeLegibility;
    }

    @font-face {
      font-family: 'Inter-Medium';
      font-display: fallback;
      src: url('/fonts/Inter-Medium.woff2') format('woff2'),
        url('/fonts/Inter-Medium.woff') format('woff');
      font-weight: 500;
      font-style: normal;
      text-rendering: optimizeLegibility;
    }

    @font-face {
      font-family: 'Inter-SemiBold';
      font-display: fallback;
      src: url('/fonts/Inter-SemiBold.woff2') format('woff2'),
        url('/fonts/Inter-SemiBold.woff') format('woff');
      font-weight: 600;
      font-style: normal;
      text-rendering: optimizeLegibility;
    }

    @font-face {
      font-family: 'PublicSans-Light';
      font-display: fallback;
      src: url('/fonts/PublicSans-Light.woff2') format('woff2'),
        url('/fonts/PublicSans-Light.woff') format('woff');
      font-weight: 300;
      font-style: normal;
      text-rendering: optimizeLegibility;
    }

    @font-face {
      font-family: 'PublicSans-Regular';
      font-display: fallback;
      src: url('/fonts/PublicSans-Regular.woff2') format('woff2'),
        url('/fonts/PublicSans-Regular.woff') format('woff');
      font-weight: 400;
      font-style: normal;
      text-rendering: optimizeLegibility;
    }

    @font-face {
      font-family: 'PublicSans-Medium';
      font-display: fallback;
      src: url('/fonts/PublicSans-Medium.woff2') format('woff2'),
        url('/fonts/PublicSans-Medium.woff') format('woff');
      font-weight: 500;
      font-style: normal;
      text-rendering: optimizeLegibility;
    }

    @font-face {
      font-family: 'PublicSans-SemiBold';
      font-display: fallback;
      src: url('/fonts/PublicSans-SemiBold.woff2') format('woff2'),
        url('/fonts/PublicSans-SemiBold.woff') format('woff');
      font-weight: 600;
      font-style: normal;
      text-rendering: optimizeLegibility;
    }
  }

  /* For browsers that do support variable fonts */
  @supports (font-variation-settings: normal) {
    @font-face {
      font-family: 'Montserrat-Variable';
      font-display: fallback;
      src: url('/fonts/Montserrat-Variable.woff2') format('woff2');
      font-weight: 300 600;
      font-style: normal;
    }

    @font-face {
      font-family: 'Inter-Variable';
      font-display: fallback;
      src: url('/fonts/Inter-Variable.woff2') format('woff2');
      font-weight: 400 600;
      font-style: normal;
    }

    @font-face {
      font-family: 'PublicSans-Variable';
      font-display: fallback;
      src: url('/fonts/PublicSans-Variable.woff2') format('woff2');
      font-weight: 300 600;
      font-style: normal;
    }
  }

  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    scroll-padding-top: 75px;
  }

  a {
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }

  span.highlight-match {
    background-color: #FFC15F;
  }

  strong {
    font-weight: 600;
  }
`;
