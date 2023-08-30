import styled from 'styled-components';
import { fontBodyMedium, fontBodyRegular } from '../styles/fonts';
import { SpacingValue } from '../styles/Theme';
import { colors } from '../styles/goboat-exclusive-theme';
import { useState } from 'react';

export interface InputProps {
  type: 'text' | 'email' | 'tel';
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  marginBottom?: SpacingValue;
  marginTop?: SpacingValue;
  valid?: boolean;
  disabled?: boolean;
}

const StyledLabel = styled.label<{ valid: boolean }>`
  ${fontBodyMedium}
  font-size: ${(props) => props.theme.fontSizes.mobile.smallText};
  text-transform: uppercase;
  display: block;
  color: ${(props) => (!props.valid ? colors.red : props.theme.colorTextSecondary)};
  margin-bottom: 8px;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    font-size: ${(props) => props.theme.fontSizes.desktop.smallText};
  }
`;

type StyledInputProps = Omit<InputProps, 'onChange'> | Omit<DateInputProps, 'onChange'>;

const StyledInput = styled.input<StyledInputProps>`
  ${fontBodyRegular}
  font-size: ${(props) => props.theme.fontSizes.mobile.text};
  color: ${(props) => props.theme.colorTextPrimary};
  padding: 8px 16px;
  margin-bottom: ${(props) =>
    props.theme.spacing[props.marginBottom || SpacingValue.small]}px;
  margin-top: ${(props) => props.theme.spacing[props.marginTop || SpacingValue.none]}px;
  width: 100%;
  border: 1px solid ${(props) => props.theme.colorTextSecondary};
  border-radius: 8px;

  ${(props) => (!props.valid ? `outline: 2px solid ${colors.red};` : '')}
  ${(props) => (!props.valid ? 'border: none;' : '')}
  ${(props) => (props.disabled ? 'cursor: not-allowed;' : '')}

  :focus-visible {
    outline: ${(props) => (!props.valid ? `2px solid ${colors.red};` : 'none')};
  }

  ::placeholder {
    opacity: 0.5;
  }

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    font-size: ${(props) => props.theme.fontSizes.desktop.text};
    width: auto;
    min-width: 300px;
  }

  @media print {
    ::placeholder {
      opacity: 0;
    }

    border-top: 0;
    border-left: 0;
    border-right: 0;
    border-radius: 0;
  }
`;

const StyledInputContainer = styled.div`
  width: 100%;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    width: auto;
  }

  @media print {
    break-inside: avoid;
  }
`;

const Input = (props: InputProps) => {
  const [pristine, setPristine] = useState(true);

  const checkIsValid = () => {
    // don't show input as invalid if it hasn't been touched
    if (pristine) {
      return true;
    }
    // don't show input as invalid if it's not required
    if (!props.required) {
      return true;
    }
    if (props.type === 'email') {
      return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/.test(props.value);
    }
    return Boolean(props.value);
  };

  const valid = checkIsValid();

  return (
    <StyledInputContainer>
      {props.label ? <StyledLabel valid={valid}>{props.label}</StyledLabel> : null}
      <StyledInput
        type={props.type}
        value={props.value}
        onChange={(event) => props.onChange(event.target.value)}
        placeholder={props.placeholder}
        required={Boolean(props.required)}
        marginTop={props.marginTop}
        marginBottom={props.marginBottom}
        onBlur={() => setPristine(false)}
        valid={valid}
        pattern={
          props.type === 'email'
            ? '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'
            : undefined
        }
        disabled={props.disabled}
      />
    </StyledInputContainer>
  );
};

export default Input;

export interface DateInputProps extends Omit<InputProps, 'type' | 'onChange'> {
  type: 'date';
  max?: string;
  min?: string;
  onChange: (value: string) => void;
}

export const DateInput = (props: DateInputProps) => {
  const [pristine, setPristine] = useState(true);
  const valid = pristine || !props.required || Boolean(props.value);
  return (
    <div>
      {props.label ? <StyledLabel valid={valid}>{props.label}</StyledLabel> : null}
      <StyledInput
        type={props.type}
        value={props.value}
        onChange={(event) => props.onChange(event.target.value)}
        placeholder={props.placeholder}
        required={Boolean(props.required)}
        marginTop={props.marginTop}
        marginBottom={props.marginBottom}
        max={props.max}
        min={props.min}
        onBlur={() => setPristine(false)}
        valid={valid}
        disabled={props.disabled}
      />
    </div>
  );
};
