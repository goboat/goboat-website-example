import React, { useState } from 'react';
import useLocalize from '../../hooks/use-localize';
import { Localization } from '../../lib/localizations';
import DynamicModuleGenerator from '../dynamic-module-generator';
import { OpenCloseIcon } from '../faq/style';
import {
  StyledFactBox,
  StyledExpandableFactBoxContent,
  StyledFactBoxControlsRow,
  StyledFactBoxContent,
  StyledOpenCloseText,
  StyledFactBoxGradientOverlay,
} from './style';

interface FactBoxProps {
  innerBlocks: any;
  expandable: boolean;
}

const FactBox = (props: FactBoxProps) => {
  const [open, setOpen] = useState(false);
  const localize = useLocalize();

  const { expandable } = props;
  // dynamic module generator expects this format
  const content = {
    blocks: props.innerBlocks,
  };

  return (
    <StyledFactBox>
      {expandable ? (
        <>
          <StyledExpandableFactBoxContent open={open} expandable={expandable}>
            <DynamicModuleGenerator content={content} skipSectionConversion={true} />
          </StyledExpandableFactBoxContent>

          <StyledFactBoxGradientOverlay open={open} />

          <StyledFactBoxControlsRow onClick={() => setOpen(!open)}>
            <StyledOpenCloseText>
              {open ? localize(Localization.close) : localize(Localization.seeMore)}
            </StyledOpenCloseText>
            <OpenCloseIcon open={open} />
          </StyledFactBoxControlsRow>
        </>
      ) : (
        <StyledFactBoxContent>
          <DynamicModuleGenerator content={content} skipSectionConversion={true} />
        </StyledFactBoxContent>
      )}
    </StyledFactBox>
  );
};

export default FactBox;
