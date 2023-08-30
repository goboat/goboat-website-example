import React from 'react';
import styled from 'styled-components';
import { fontBodyRegular } from '../styles/fonts';

import { textCss } from './Text';
import { getPixelClamp } from '../lib/utils';

const StyledWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 8px 0;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    margin: 16px 0;
  }
`;

const StyledCheckbox = styled.input`
  transform: scale(1.3);

  ${(props) => (props.disabled ? 'cursor: not-allowed;' : '')}

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    margin-top: ${getPixelClamp(8)};
  }
`;

const StyledLabel = styled.label`
  ${fontBodyRegular}
  ${textCss}
  margin: 0;
  margin-left: 8px;
`;

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  required?: boolean;
  label: string;
  id: string;
}

const Checkbox = (props: CheckboxProps) => {
  return (
    <StyledWrapper>
      <StyledCheckbox
        type="checkbox"
        checked={props.checked}
        disabled={Boolean(props.disabled)}
        onChange={(event) => props.onChange(event.target.checked)}
        id={props.id}
        required={Boolean(props.required)}
      />
      <StyledLabel htmlFor={props.id}>{props.label}</StyledLabel>
    </StyledWrapper>
  );
};

export default Checkbox;
