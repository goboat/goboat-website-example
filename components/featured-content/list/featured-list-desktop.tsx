/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from 'react';

import { Heading2, Text } from '../../../sub-components/Text';
import Section from '../../section/section';
import { GridOptionValue } from '../../section/types';
import FeaturedListDesktopList from './featured-list-desktop-list';
import FeaturedListDesktopImage from './featured-list-desktop-image';
import { SpacingValue } from '../../../styles/Theme';
import Button, { ButtonSize, ButtonType } from '../../../sub-components/buttons/button';
import Column from '../../section/column';
import { FeaturedListDesktopHeading, FeaturedListDesktopText } from './style';
import { FeaturedContentProps } from '../types';

const FeaturedListDesktop = (props: FeaturedContentProps) => {
  const { heading, paragraph, linkText, linkUrl, entries } = props;

  const [currentTip, setCurrentTip] = useState(entries[0]);
  const [shouldAutoplay, setShouldAutoplay] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timer;

    const startAutoplay = () => {
      interval = setInterval(() => {
        const currentTipIndex = entries.findIndex((tip) => tip.key === currentTip.key);
        const nextTipIndex = (currentTipIndex + 1) % entries.length;

        setCurrentTip(entries[nextTipIndex]);
      }, 4000);
    };

    if (shouldAutoplay) startAutoplay();

    return () => clearInterval(interval);
  }, [entries, currentTip, shouldAutoplay]);

  return (
    <Section
      marginTop={SpacingValue.none}
      marginBottom={SpacingValue.none}
      paddingTop={SpacingValue.none}
      paddingBottom={SpacingValue.none}
      gridOptions={{ left: GridOptionValue.extended, right: GridOptionValue.full }}
      template={[{ width: '1/3' }, { width: '2/3' }]}
    >
      <Column>
        <FeaturedListDesktopHeading>{heading}</FeaturedListDesktopHeading>

        <FeaturedListDesktopText>{paragraph}</FeaturedListDesktopText>

        <FeaturedListDesktopList
          tips={entries}
          current={currentTip}
          onHover={(tip) => {
            setCurrentTip(tip);
            setShouldAutoplay(false);
          }}
          onLeave={() => setShouldAutoplay(true)}
        />

        {linkText && linkUrl && (
          <Button
            visualType={ButtonType.primary}
            size={ButtonSize.small}
            marginTop={SpacingValue.none}
            marginBottom={SpacingValue.none}
            text={linkText}
            link={{ url: linkUrl }}
          />
        )}
      </Column>

      <Column>
        <FeaturedListDesktopImage tip={currentTip} />
      </Column>
    </Section>
  );
};

export default FeaturedListDesktop;
