import { GetStaticProps, GetStaticPropsContext } from 'next';
import { siteId } from '../lib/config';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import DynamicModuleGenerator, {
  ContentBlock,
} from '../components/dynamic-module-generator';
import HeadStructure, { YoastSEOData } from '../components/head/Head';
import StopPreview from '../components/StopPreview';
import { GetResourceQueryVariables } from '../lib/graphql-sdk-content';
import getWithRetries from '../lib/graphql/get-with-retries';
import { hasProperty } from '../lib/utils';

const getKey = (context: GetStaticPropsContext) => {
  let key = '';

  if (Array.isArray(context?.params?.slug)) {
    key = `/${context?.params?.slug?.join('/')}`;
  }

  if (key === '') key = '/';

  return key;
};

export const getStaticProps: GetStaticProps = async (context) => {
  const variables: GetResourceQueryVariables = {
    key: getKey(context),
    target: context.preview ? 'draft' : 'live',
    siteId,
    type: 'page',
  };

  const data = await getWithRetries('getResource', variables);

  const now = new Date().toISOString();

  return {
    props: {
      data,
      now,
    },
    revalidate: 60,
  };
};

export function assertPageProps(props: unknown): props is PageProps {
  const hasData = hasProperty(props, 'data');
  const hasNow = hasProperty(props, 'now');

  if (hasData && hasNow) {
    const hasContent = hasProperty(props.data, 'resource');
    const nowIsString = typeof props.now === 'string';
    return hasContent && nowIsString;
  }
  return false;
}

export interface PageProps {
  data: { resource: Content };
  now: string;
}
interface Content {
  content: {
    seo: YoastSEOData;
    post_title: string;
    blocks: ContentBlock[];
  };
}

const Page: NextPage<PageProps> = (props) => {
  const router = useRouter();
  const content = props?.data?.resource?.content ?? {};

  console.log('Site last built:', props.now);

  return (
    <>
      <HeadStructure seoData={props?.data?.resource?.content?.seo} />
      {router.isPreview && <StopPreview />}

      <DynamicModuleGenerator content={content} />
    </>
  );
};

const page = {
  Component: Page,
  getStaticProps,
};

export default page;
