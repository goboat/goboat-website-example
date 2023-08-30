import styled from 'styled-components';

import { Heading3, Text } from '../../sub-components/Text';
import Section from '../section/section';

export const ANSWER_TRANSITION_HEIGHT = 200;

export const FaqArrow = styled.div`
  position: relative;
  opacity: 0;
  height: 10px;
  width: 10px;
  transition: opacity 0.3s;
  display: none;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    display: inline-table;
  }
`;

export const FaqQuestion = styled.div`
  cursor: pointer;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr min-content;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    grid-template-columns: min-content 1fr min-content;
  }
`;

export const FaqAnswer = styled.div`
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
  opacity: 1;

  &.answer-open {
    max-height: unset !important;
  }

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    margin-right: 32px;
  }
`;

export const FaqHeading = styled(Text)<{ open?: boolean }>`
  position: relative;
  flex-grow: 1;
  transition: all 0.3s ease-in-out;
  font-weight: ${(props) => (props.open ? 600 : 400)};
  left: 0;
  margin: 0;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    left: ${(props) => (props.open ? '10px' : '-18px')};
  }
`;

interface IconProps {
  open?: boolean;
}

export const VisibilityIcon = styled.div<IconProps>`
  background: ${(props) => props.theme.colorTextPrimary};
  position: relative;
  transition: 0.25s all cubic-bezier(0.17, 0.67, 0.09, 0.97);
  margin-left: 5px;
  width: 21.5px;
  height: 2.28px;
  border-radius: 5px;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    width: 16.4px;
    height: 2px;
  }

  &:after {
    content: '';
    transition: 0.25s all cubic-bezier(0.17, 0.67, 0.09, 0.97);
    transition-delay: 0.1s;
    height: 2.6px;
    position: absolute;
    background: ${(props) => props.theme.colorTextPrimary};
    transform: ${(props) => (props.open ? 'rotate(0deg)' : 'rotate(90deg)')};
    opacity: ${(props) => (props.open ? '0' : '1')};
    width: 21.5px;
    border-radius: 5px;

    @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
      width: 16.4px;
      height: 2px;
    }
  }
`;

// Used for fact box component, ran into a problem where this
// can't be defined in the fact box's styled.ts file
export const OpenCloseIcon = styled(VisibilityIcon)`
  background: ${(props) => props.theme.colors.factBoxText};

  &:after {
    background: ${(props) => props.theme.colors.factBoxText};
  }
`;

interface FaqWrapperProps {
  open?: boolean;
}

export const FaqItemWrapper = styled.div<FaqWrapperProps>`
  border-bottom: solid 1px #000000;
  &:first-of-type {
    border-top: solid 1px #000000;
  }
  position: relative;
  padding: 12px 0;

  ${FaqAnswer} {
    max-height: ${(props) => (props.open ? `${ANSWER_TRANSITION_HEIGHT}px` : '0')};
  }
  ${FaqArrow} {
    opacity: ${(props) => (props.open ? '1' : '0')};
  }

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    padding: 24px 0;

    ${FaqHeading} {
      left: ${(props) => (props.open ? '10px' : '-18px')};
    }

    &:hover {
      ${FaqArrow} {
        opacity: 1;
      }
      ${FaqHeading} {
        left: 10px;
      }
    }
  }
`;

export const FaqSection = styled(Section)`
  margin: 64px 0;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    margin: 128px 0;
  }
`;

export const FaqSectionHeading = styled(Heading3)`
  margin: 0 0 12px;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    margin: 22px 0 0;
  }
`;
