import styled from 'styled-components';
import { baseParagraphCss } from '../../sub-components/Text';
import Section from '../section/section';

export const SearchInputWrapper = styled.div`
  width: 100%;
  border-radius: 360px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  background: ${(props) => props.theme.colors.inputBackground};

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    padding: 16px 24px;
  }
`;

export const SearchInput = styled.input`
  border: 0;
  outline: 0;
  background: transparent;
  width: 100%;
  margin-left: 8px;

  ${baseParagraphCss}

  margin-top: 0;
  margin-bottom: 0;

  line-height: 1.3;

  font-size: ${(props) => props.theme.fontSizes.mobile.text};
  margin-left: 8px;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    margin-left: 12px;
    font-size: ${(props) => props.theme.fontSizes.desktop.text};
  }
`;

export const FaqCollectionSection = styled(Section)`
  margin: 32px 0 64px;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    margin: 64px 0 128px;
  }
`;
