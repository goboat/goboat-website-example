import { useEffect } from 'react';
import App from 'next/app';
import styled, { DefaultTheme, Theme, ThemeProvider } from 'styled-components';
import TagManager from 'react-gtm-module';
import type { AppProps } from 'next/app';

import GlobalStyles from '../styles/GlobalStyles';
import { goboat } from '../styles/Theme';
import { Header } from '../components/header/Header';
import GeneralOptionsContext, {
  GeneralOptionsType,
} from '../lib/general-options-context';
import ViewportSubscriber from '../components/ViewportSubscriber';
import useLocale, { getLocale } from '../hooks/use-locale';
import Footer from '../components/footer/Footer';
import { locales, siteId } from '../lib/config';
import getWithRetries from '../lib/graphql/get-with-retries';
import { goboatExclusivetheme } from '../styles/goboat-exclusive-theme';

interface GoBoatAppProps extends AppProps {
  generalOptions: GeneralOptionsType;
  menu: any;
  footer: any;
  pageProps: any;
}

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: ${(props) => props.theme.colorPageBackground};
`;

const ComponentContainer = styled.main`
  flex: 1;
  background-color: ${(props) => props.theme.colorPageBackground};
`;

const themes: Record<Theme, DefaultTheme> = {
  GOBOAT: goboat,
  GOBOAT_EXCLUSIVE: goboatExclusivetheme,
};

function MyApp(props: GoBoatAppProps) {
  const { Component, pageProps, generalOptions, menu, footer } = props;

  const locale = useLocale();
  const location = pageProps.data?.resource?.content?.location;
  const aggregatedGeneralOptions = { ...generalOptions, location };

  useEffect(() => {
    if (generalOptions.gtmCode) {
      TagManager.initialize({
        gtmId: generalOptions.gtmCode,
        dataLayer: {
          environment: process.env.NEXT_PUBLIC_NODE_ENV,
          language: locale,
        },
      });
    } else {
      console.warn('GTM Not Configured');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const theme = themes[generalOptions.theme] || goboat;

  return (
    <>
      <GlobalStyles />
      <GeneralOptionsContext.Provider value={aggregatedGeneralOptions}>
        <ThemeProvider theme={theme}>
          <BodyContainer>
            <Header menu={menu} />
            <ComponentContainer>
              <Component {...pageProps} />
            </ComponentContainer>
            <Footer footer={footer} socials={generalOptions?.social_media_country} />
          </BodyContainer>
          <ViewportSubscriber />
        </ThemeProvider>
      </GeneralOptionsContext.Provider>
    </>
  );
}

MyApp.getInitialProps = async (appContext: any) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  // cannot use hook here, otherwise useLocale hook is preferred
  const locale = getLocale(appContext.router.asPath);

  const data = await getWithRetries('getGeneralOptions', {
    siteId,
    target: appContext.isPreview ? 'draft' : 'live',
    languages: locales.length > 1 ? [locale] : [],
  });

  // todo: parse needed settings
  const generalOptions: GeneralOptionsType = {
    siteName: data.generalOptions?.content?.site_name,
    siteUrl: data.generalOptions?.content?.site_url,
    bookingSystemUrl: data.generalOptions?.content?.booking_system_url,
    country: data.generalOptions?.content?.country,
    gtmCode: data.gtm?.content?.gtm_code,
    locations: data.locations,
    social_media_country: data.generalOptions?.content?.social_media_country,
    articlesSleeknote: data.generalOptions?.content?.articles_sleeknote_forms,
    eventsSleeknote: data.generalOptions?.content?.events_sleeknote_forms,
    articleTags: data.articleTags || [],
    articlesPages: data.generalOptions?.content?.articles_pages,
    eventsPages: data.generalOptions?.content?.events_pages,
    globalNoindex: data.generalOptions?.content?.global_noindex,
    theme: data.visual?.content?.theme,
    translations: data.translations?.content,
    enableCustomBookingLink: data.generalOptions?.content?.enable_custom_booking_link,
    customBookingLink: data.generalOptions?.content?.custom_booking_link,
  };

  const menu = await getWithRetries('getResource', {
    siteId,
    target: appContext.isPreview ? 'draft' : 'live',
    key: `/wp-json/content/v1/menus/${locale}_menu`,
  });

  const footer = data.footer?.content;

  return {
    ...appProps,
    generalOptions,
    menu,
    footer,
  };
};

export default MyApp;
