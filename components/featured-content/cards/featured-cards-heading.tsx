import Image from 'next/image';

import { SpacingValue } from '../../../styles/Theme';
import { Heading1 } from '../../../sub-components/Text';
import { ArrowIcon, FirstRow, IconsContainer } from '../../carousel/style';
import { DefaultTheme, useTheme } from 'styled-components';

interface FeaturedContentHeadingProps {
  heading: string;
  onPrev: () => void;
  onNext: () => void;
  isPrevValid: boolean;
  isNextValid: boolean;
}

const FeaturedCardsHeading = (props: FeaturedContentHeadingProps) => {
  const { heading, onPrev, onNext, isPrevValid, isNextValid } = props;
  const theme = useTheme();

  const prevIconSrc = theme.name === 'GOBOAT_EXCLUSIVE' ? '/d13-c.svg' : '/d13.svg';
  const nextIconSrc = theme.name === 'GOBOAT_EXCLUSIVE' ? '/d12-c.svg' : '/d12.svg';

  return (
    <FirstRow>
      <Heading1 marginTop={SpacingValue.none} marginBottom={SpacingValue.none}>
        {heading}
      </Heading1>

      <IconsContainer>
        <ArrowIcon onClick={onPrev}>
          <Image
            src={prevIconSrc}
            width={56}
            height={56}
            layout="responsive"
            alt="Arrow left"
            style={{ opacity: isPrevValid ? 1 : 0.4 }}
          />
        </ArrowIcon>

        <ArrowIcon onClick={onNext}>
          <Image
            src={nextIconSrc}
            width={56}
            height={56}
            layout="responsive"
            alt="Arrow right"
            style={{ opacity: isNextValid ? 1 : 0.4 }}
          />
        </ArrowIcon>
      </IconsContainer>
    </FirstRow>
  );
};

export default FeaturedCardsHeading;
