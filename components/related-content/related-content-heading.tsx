import Image from 'next/image';

import { SpacingValue } from '../../styles/Theme';
import { Heading2 } from '../../sub-components/Text';
import { ArrowIcon, IconsContainer } from '../carousel/style';
import { FirstRow } from './style';

interface RelatedContentHeadingProps {
  heading: string;
  onPrev: () => void;
  onNext: () => void;
  isPrevValid: boolean;
  isNextValid: boolean;
}

const RelatedContentHeading = (props: RelatedContentHeadingProps) => {
  const { heading, onPrev, onNext, isPrevValid, isNextValid } = props;

  const prevIconSrc = isPrevValid ? '/d13.svg' : '/d11.svg';
  const nextIconSrc = isNextValid ? '/d12.svg' : '/d14.svg';

  return (
    <FirstRow>
      <Heading2 marginTop={SpacingValue.none} marginBottom={SpacingValue.none}>
        {heading}
      </Heading2>

      <IconsContainer>
        <ArrowIcon onClick={onPrev}>
          <Image
            src={prevIconSrc}
            width={56}
            height={56}
            layout="responsive"
            alt="Arrow left"
          />
        </ArrowIcon>

        <ArrowIcon onClick={onNext}>
          <Image
            src={nextIconSrc}
            width={56}
            height={56}
            layout="responsive"
            alt="Arrow right"
          />
        </ArrowIcon>
      </IconsContainer>
    </FirstRow>
  );
};

export default RelatedContentHeading;
