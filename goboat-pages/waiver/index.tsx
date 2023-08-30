import { NextPage } from 'next';
import Head from 'next/head';
import { useContext } from 'react';
import Column from '../../components/section/column';
import Section from '../../components/section/section';
import { RenderedSectionProps, GridOptionValue } from '../../components/section/types';
import { GetWaiverQuery } from '../../lib/graphql-sdk-api-gateway';
import GeneralOptionsContext from '../../lib/general-options-context';
import { SpacingValue } from '../../styles/Theme';
import getStaticProps from './get-static-props';
import WaiverContent from './waiver-content';
import { hasProperty } from '../../lib/utils';
import { useRouter } from 'next/router';
import StopPreview from '../../components/StopPreview';

export function assertWaiverPropsType(props: unknown): props is WaiverPageProps {
  // for now we are happy with there being a waiver property
  // as none of our other pages will have this prop
  const hasWaiver = hasProperty(props, 'waiver');
  return hasWaiver;
}

export type WaiverPageProps = {
  waiver: GetWaiverQuery['getWaiver'];
};

const WaiverComponent: NextPage<WaiverPageProps> = (props) => {
  const sectionProps: RenderedSectionProps = {
    template: [{ width: 2 }, { width: 8 }, { width: 2 }],
    marginTop: SpacingValue.small,
    marginBottom: SpacingValue.large,
    paddingTop: SpacingValue.none,
    paddingBottom: SpacingValue.none,
    gridOptions: {
      left: GridOptionValue.normal,
      right: GridOptionValue.normal,
    },
  };

  const router = useRouter();

  const generalOptions = useContext(GeneralOptionsContext);

  return (
    <>
      {router.isPreview && <StopPreview />}
      <Head>
        <title>
          {props.waiver.name} - {generalOptions.siteName}
        </title>
        <meta name="robots" content="noindex"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Section {...sectionProps}>
        <Column />

        <Column>
          <WaiverContent waiver={props.waiver} />
        </Column>

        <Column />
      </Section>
    </>
  );
};

const waiverPage = {
  Component: WaiverComponent,
  getStaticProps: getStaticProps,
};

export default waiverPage;
