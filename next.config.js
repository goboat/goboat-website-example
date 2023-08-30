/** @type {import('next').NextConfig} */
const { request, gql } = require('graphql-request');

const locales = process.env.NEXT_PUBLIC_LOCALES?.split(',') || [];
const defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    loader: 'imgix',
    path: process.env.NEXT_PUBLIC_IMAGE_HOST,
  },
  async redirects() {
    const redirects = [];

    try {
      const { resource } = await request(
        `${process.env.CONTENT_HOST}/graphql`,
        gql`
          query getResource($siteId: String!, $target: String!, $key: String) {
            resource(siteId: $siteId, target: $target, key: $key) {
              _id
              key
              hash
              content
            }
          }
        `,
        {
          siteId: process.env.NEXT_PUBLIC_CONTENT_SITE_ID,
          target: 'live',
          key: '/wp-json/rawb/v1/redirects',
        }
      );

      redirects.push(...resource.content.redirects).map((redirect) => {
        return {
          permanent: true,
          // remove ? and everything after (also removes trailing slash if present)
          source: redirect.source.replace(/\/?\?.+/, ''),
          destination: redirect.destination,
        };
      });
    } catch (error) {
      console.error('Error getting redirects from content service');
      console.error(error);
    }

    /**
     * If site has many languages, redirect from '/' to '/[default-language]'
     */
    if (locales.length > 1) {
      redirects.push({
        source: '/',
        destination: `/${defaultLocale}`,
        permanent: true,
      });
    }

    return redirects;
  },
};

module.exports = nextConfig;
