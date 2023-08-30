import type { NextPage } from 'next';

import { Link } from '../sub-components/Text';
import { defaultLocale, locales } from '../lib/config';
import useLocale from '../hooks/use-locale';
import PageHeader from '../components/page-header/header';
import Section from '../components/section/section';
import Column from '../components/section/column';
import { SpacingValue } from '../styles/Theme';
import { GridOptionValue } from '../components/section/types';

const NotFound: NextPage = () => {
  const activeLocale = useLocale();
  const homePageLink = locales.length > 1 ? `/${activeLocale || defaultLocale}` : '/';

  return (
    <>
      <PageHeader heading="Page not found" />

      <Section
        template={[{ width: '1/1' }]}
        marginTop={SpacingValue.none}
        marginBottom={SpacingValue.large}
        paddingTop={SpacingValue.none}
        paddingBottom={SpacingValue.none}
        gridOptions={{ left: GridOptionValue.normal, right: GridOptionValue.normal }}
      >
        <Column>
          <Link href={homePageLink} arrow>
            Go back home
          </Link>
        </Column>
      </Section>
    </>
  );
};

export default NotFound;
