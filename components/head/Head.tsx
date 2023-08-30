import Head from 'next/head';
import { useContext } from 'react';
import GeneralOptionsContext from '../../lib/general-options-context';

export interface YoastSEOData {
  robots: {
    'max-snippet': string;
    snippet: string;
    'max-image-preview': string;
    imageindex: string;
    archive: string;
    follow: string;
    index: string;
    'max-video-preview': string;
  };
  description: string;
  og_title: string;
  og_description: string;
  canonical: string;
  og_locale: string;
  og_type: string;
  og_url: string;
  og_site_name: string;
  schema: object;
  modified_time: string;
  title: string;
}

interface HeadStructureProps {
  seoData: YoastSEOData;
}

const HeadStructure = (props: HeadStructureProps) => {
  const { seoData } = props;

  const { globalNoindex } = useContext(GeneralOptionsContext);

  const snippet = seoData?.robots?.['max-snippet']
    ? seoData?.robots?.['max-snippet']
    : seoData?.robots?.snippet;
  const imagePreview = seoData?.robots?.['max-image-preview']
    ? seoData?.robots?.['max-image-preview']
    : seoData?.robots?.imageindex;

  const robotsTags = [
    seoData?.robots?.follow,
    seoData?.robots?.index,
    seoData?.robots?.archive,
    imagePreview,
    snippet,
    seoData?.robots?.['max-video-preview'],
  ].filter((tag) => {
    if (globalNoindex) {
      return tag && tag !== 'index';
    }

    return tag !== undefined;
  });

  if (globalNoindex) {
    robotsTags.push('noindex');
  }

  // remove trailing slash from canonical links
  const canonical = seoData?.canonical ? (
    <link rel="canonical" href={String(seoData.canonical).replace(/\/$/, '')} />
  ) : null;

  return (
    <Head>
      <meta name="robots" content={robotsTags.join(', ')} />
      <title>{seoData?.title}</title>
      <meta name="description" content={seoData?.description} />
      <link rel="icon" href="/favicon.ico" />
      {canonical}
      <meta property="og:locale" content={seoData?.og_locale} />
      <meta property="og:type" content={seoData?.og_type} />
      <meta property="og:title" content={seoData?.og_title} />
      <meta property="og:description" content={seoData?.og_description} />
      <meta property="og:url" content={seoData?.og_url} />
      <meta property="og:site_name" content={seoData?.og_site_name} />
      <meta property="article:modified_time" content={seoData?.modified_time} />
      <script type="application/ld+json">{JSON.stringify(seoData?.schema)}</script>
    </Head>
  );
};
export default HeadStructure;
