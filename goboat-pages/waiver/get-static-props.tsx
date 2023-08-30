import { GetStaticProps } from 'next';
import { WaiverPageProps } from '.';
import { apiGatewayGetWithRetries } from '../../lib/graphql/get-with-retries';

const getStaticProps: GetStaticProps<WaiverPageProps> = async (context) => {
  const slug =
    '/' + (Array.isArray(context.params?.slug) ? context?.params?.slug.join('/') : '');
  const waiverId = slug.split('/')[slug.split('/').length - 1];

  try {
    const queryResult = await apiGatewayGetWithRetries('getWaiver', {
      id: waiverId,
    });

    return {
      props: {
        waiver: queryResult.getWaiver,
      },
      revalidate: 60,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default getStaticProps;
