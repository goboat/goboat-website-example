import React from 'react';
import { SeeAlsoContainer, StyledArrow } from './style';
import SeeAlsoImage from './see-also-image';
import { GenericContentType } from '../../lib/types';
import { Heading3, SmallText } from '../../sub-components/Text';
import { SpacingValue } from '../../styles/Theme';
import Link from 'next/link';
import useLocalize from '../../hooks/use-localize';
import { Localization } from '../../lib/localizations';

interface AutoPopulateError {
  __reference: string;
  __error: number;
}

interface SeeAlsoProps {
  reference: GenericContentType | AutoPopulateError;
}

function isReferenceError(
  reference: GenericContentType | AutoPopulateError
): reference is AutoPopulateError {
  return '__error' in reference;
}

const SeeAlso = (props: SeeAlsoProps) => {
  const localize = useLocalize();
  if (isReferenceError(props.reference)) {
    return null;
  }

  return (
    <Link href={props.reference.adjusted_permalink || props.reference.permalink} passHref>
      <SeeAlsoContainer>
        <SeeAlsoImage image={props.reference.featured_info?.image} />
        <div>
          <Heading3 margin={SpacingValue.xsmall}>
            {localize(Localization.seeAlso)}:
          </Heading3>
          <SmallText margin={SpacingValue.none}>{props.reference.post_title}</SmallText>
        </div>
        <StyledArrow />
      </SeeAlsoContainer>
    </Link>
  );
};

export default SeeAlso;
