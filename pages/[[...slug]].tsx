import { GetStaticPaths, GetStaticProps } from 'next';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import getRoute, { pages } from '../goboat-pages/goboat-router';
import { isBuild, locales, siteId } from '../lib/config';
import NotFound from '../goboat-pages/not-found';
import { GetStaticPathsQueryVariables } from '../lib/graphql-sdk-content';
import getWithRetries, {
  apiGatewayGetWithRetries,
} from '../lib/graphql/get-with-retries';
import { assertPageProps } from '../goboat-pages/page';
import { assertWaiverPropsType } from '../goboat-pages/waiver';
import { useCookies } from 'react-cookie';

export const getStaticPaths: GetStaticPaths = async () => {
  const variables: GetStaticPathsQueryVariables = {
    target: 'live',
    siteId,
  };

  const data = await getWithRetries('getStaticPaths', variables);

  const pagePaths = data.pages.map((resource) => {
    return {
      params: {
        slug: String(resource.key).replace(/^\//, '').split('/'),
      },
    };
  });

  const eventsSlug = [{ key: '/events' }];
  const eventsPath = eventsSlug.map((events) => {
    return {
      params: {
        slug: events.key.replace(/^\//, '').split('/'),
      },
    };
  });

  const eventPaths = data.events.map((resource) => {
    // here we must get the language of each event and prepend it
    const slug = String(resource.key).replace(/^\//, '').split('/');

    if (locales.length > 1) {
      const removedLocale = slug.splice(1, 1);
      slug.splice(0, 0, removedLocale[0]);
    }

    return {
      params: {
        slug,
      },
    };
  });

  const articlesSlug = [{ key: '/articles' }];
  const articlesPath = articlesSlug.map((articles) => {
    return {
      params: {
        slug: articles.key.replace(/^\//, '').split('/'),
      },
    };
  });

  const articlePaths = data.articles.map((resource) => {
    // here we must get the language of each article and prepend it
    const slug = String(resource.key).replace(/^\//, '').split('/');

    if (locales.length > 1) {
      const removedLocale = slug.splice(1, 1);
      slug.splice(0, 0, removedLocale[0]);
    }

    return {
      params: {
        slug,
      },
    };
  });

  const waiverPaths = (
    await Promise.all(
      // for each location ...
      data.locations.flatMap(async (location) => {
        if (location.content?.shop_id) {
          // ... get active waivers ...
          const shop = await apiGatewayGetWithRetries('getShopWithWaivers', {
            id: String(location.content?.shop_id),
          });
          // ... and for each language ...
          return locales.flatMap((language) => {
            // ... and waiver combination ...
            return (shop.getShop?.waivers || []).map((waiver) => {
              // ... return waiver slug
              const slug = `/${language}/waivers/${waiver.id}`;
              return slug;
            });
          });
        } else {
          return [];
        }
      })
    )
  ).flat(3);

  const paths =
    locales.length < 2
      ? [...pagePaths, ...articlePaths, ...articlesPath, ...eventsPath, ...waiverPaths]
      : [...pagePaths, ...articlePaths, ...eventPaths, ...waiverPaths];

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const asPath = Array.isArray(context.params?.slug)
    ? '/' + context.params?.slug.join('/')
    : '/';

  const { getStaticProps } = getRoute(asPath);

  if (isBuild) {
    const time = Math.random() * 1000 * 10;
    console.log(`BUILDING ${asPath} - WAITING ${(time / 1000).toFixed(2)} SECONDS`);
    await new Promise((resolve) => {
      // wait a random time between 0 and 10 sec
      setTimeout(resolve, time);
    });
    console.log(`DONE WAITING FOR ${asPath}`);
  }

  return await getStaticProps(context);
};

const getCookieDomain = () => {
  let cookieDomain;

  // The domain needs to be prefixed by a . to make the cookie available to subdomains
  if (typeof process.env.NEXT_PUBLIC_DOMAIN !== 'undefined') {
    cookieDomain = `.${process.env.NEXT_PUBLIC_DOMAIN}`;
  } else if (typeof window !== 'undefined' && window?.location?.hostname) {
    cookieDomain = `.${window.location.hostname}`;
  }

  return cookieDomain;
};

interface Props {
  data?: any;
  now?: string;
}

const Page: NextPage<Props> = (props) => {
  const { asPath, query } = useRouter();
  const [cookies, setCookie] = useCookies();

  if (query.pacid && query.paid && !cookies.goboat_affiliate) {
    setCookie(
      'goboat_affiliate',
      JSON.stringify({ pacid: query.pacid, paid: query.paid }),
      {
        domain: getCookieDomain(),
        path: '/',
        maxAge: 60 * 60 * 24 * 40,
      }
    );
  }

  // if multilingual, articles page is at /da/articles/my-article
  // otherwise, just /articles/my-article
  const articleRegexp = new RegExp(
    `${locales.length > 1 ? `/(${locales.join('|')})` : ''}/articles/([^/]+/?$)`
  );
  const eventRegexp = new RegExp(
    `${locales.length > 1 ? `/(${locales.join('|')})` : ''}/events/([^/]+/?$)`
  );
  const waiverRegexp = new RegExp(
    `${locales.length > 1 ? `/(${locales.join('|')})` : ''}/waivers/([^/]+/?$)`
  );

  if (articleRegexp.test(asPath)) {
    const Component = pages.article.Component;
    return <Component {...props} />;
  } else if (eventRegexp.test(asPath)) {
    const Component = pages.event.Component;
    return <Component {...props} />;
  } else if (waiverRegexp.test(asPath)) {
    const Component = pages.waiverPage.Component;
    if (assertWaiverPropsType(props)) {
      return <Component {...props} />;
    } else return <NotFound />;
  } else {
    const Component = pages.page.Component;
    if (assertPageProps(props)) {
      if (props.data.resource === null) {
        return <NotFound />;
      }
      return <Component {...props} />;
    }
    return <NotFound />;
  }
};

export default Page;
