import styled from 'styled-components';

import Button from '../../sub-components/buttons/button';
import {
  Heading3,
  heading3Css,
  heading1Css,
  heading2Css,
  textCss,
  Text,
  SmallText,
} from '../../sub-components/Text';

export const ErrorMessage = styled(Heading3)`
  color: red;
`;

export const WaiverContentWrapper = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.medium}px;

  p {
    ${textCss}
  }

  h1 {
    ${heading1Css}
  }

  h2 {
    ${heading2Css}
  }

  h3 {
    ${heading3Css}
  }

  img {
    max-width: 100%;
  }

  iframe {
    width: 100%;
    aspect-ratio: 16/9;
    height: auto;
    border: none;
  }
`;

export const WaiverButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media print {
    display: none;
  }
`;

export const PrintCssSignatureContainer = styled.div`
  display: none;

  @media print {
    display: block;
    break-inside: avoid;
  }
`;

export const StyledForm = styled.form`
  @media print {
    break-inside: avoid;
  }
`;

export const MinorSignaturesCheckboxWrapper = styled.div<{ disabled: boolean }>`
  @media print {
    display: none;
  }
  ${(props) => (props.disabled ? 'display: none' : '')}
`;

export const ShareWaiverContainer = styled.div`
  width: 100%;
  background: #f2f2f2;
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-radius: 8px;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    padding: 24px;
  }
`;

export const ShareWaiverHeading = styled(Heading3)`
  margin-top: 0;
  margin-bottom: ${(props) => props.theme.spacing.xsmall}px;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    margin-bottom: ${(props) => props.theme.spacing.small}px;
  }
`;

export const ShareWaiverText = styled(Text)`
  margin-top: 0;
  margin-bottom: ${(props) => props.theme.spacing.small}px;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    margin-bottom: ${(props) => props.theme.spacing.medium}px;
  }
`;

export const ShareWaiverButton = styled(Button)`
  align-self: center;
  margin-top: 0;
  margin-bottom: ${(props) => props.theme.spacing.xsmall}px;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    margin-bottom: ${(props) => props.theme.spacing.small}px;
  }
`;

export const ShareWaiverSubText = styled(SmallText)`
  align-self: center;
  margin: 0;
  transition: all 0.5s ease-in-out;
`;

export const MinorsWrapper = styled.div`
  @media print {
    display: none;
  }
`;

export const MinorStyledRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  width: 100%;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    width: fit-content;
  }
`;

export const MinorWrapper = styled.div`
  margin-bottom: 32px;

  &:first-of-type {
    margin-top: 32px;
  }

  &:not(:last-of-type) {
    border-bottom: 1px solid ${(props) => props.theme.colorSecondary};
    padding-bottom: 24px;
    margin-bottom: 24px;
  }

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    width: fit-content;
  }
`;

export const RemoveMinorButton = styled(Button)`
  margin: 0;
  margin-top: ${(props) => props.theme.spacing.smallx}px;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    margin-top: ${(props) => props.theme.spacing.medium}px;
  }
`;
