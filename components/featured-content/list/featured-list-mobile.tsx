import Image from 'next/image';

import { Heading2, Link, Text } from '../../../sub-components/Text';
import { ArrowIcon } from '../carousel/style';
import Section from '../../section/section';
import { GridOptionValue } from '../../section/types';
import FeaturedListMobileEntry from './featured-list-mobile-entry';
import { SpacingValue } from '../../../styles/Theme';
import Column from '../../section/column';
import { FeaturedContentProps } from '../types';

const FeaturedListMobile = (props: FeaturedContentProps) => {
  const { heading, paragraph, linkText, linkUrl, entries } = props;

  const filteredTips = entries.slice(0, 2);

  return (
    <Section
      marginTop={SpacingValue.none}
      marginBottom={SpacingValue.none}
      paddingTop={SpacingValue.none}
      paddingBottom={SpacingValue.none}
      gridOptions={{ left: GridOptionValue.normal, right: GridOptionValue.normal }}
      template={[{ width: '1/1' }]}
    >
      <Column>
        <Heading2 style={{ marginBottom: '16px' }}>{heading}</Heading2>

        <Text style={{ marginTop: 0, marginBottom: '40px' }}>{paragraph}</Text>

        <div style={{ marginBottom: '16px' }}>
          {filteredTips.map((tip) => (
            <FeaturedListMobileEntry key={tip.key} tip={tip} />
          ))}
        </div>

        {linkText && linkUrl && (
          <Link href={linkUrl}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              {linkText}
              <ArrowIcon
                style={{
                  marginLeft: '8px',
                  marginRight: 0,
                  display: 'inline-block',
                  verticalAlign: 'middle',
                }}
              >
                <Image src="/d12.svg" width={18} height={18} alt="Arrow right" />
              </ArrowIcon>
            </div>
          </Link>
        )}
      </Column>
    </Section>
  );
};

export default FeaturedListMobile;
