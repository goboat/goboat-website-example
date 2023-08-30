import styled from 'styled-components';
import Image from '../../components/image/image';

import { StyledTag } from '../../sub-components/selected-tags';
import { SmallText } from '../../sub-components/Text';

export const ArticleDate = styled(SmallText)`
  grid-column: 1 / -1;
  grid-row: 1;
  margin: 25px 0 0 56px;
  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    margin: 0;
    grid-column: 7 / span 4;
    text-align: right;
    align-self: center;
  }
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  grid-column: 1 / -1;
  margin-top: 16px;
  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    margin-top: 0;
    grid-column: 7 / span 4;
    flex-flow: row-reverse;
  }
`;

export const ArticleTag = styled(StyledTag)`
  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    margin-right: 0px;
    margin-left: 8px;
  }
`;

export const ArticleAuthor = styled(SmallText)`
  margin: 8px 0 0 56px;
  grid-column: 1 / -1;
  grid-row: 1;
  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    margin: 0 0 0 56px;
    grid-column: 3 / span 4;
    grid-row: 1;
    align-self: center;
  }
`;

export const StyledImage = styled(Image)`
  width: 100%;
  height: 316px;
  position: relative;
  margin: 0;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    height: 616px;
  }
`;

export const Caption = styled(SmallText)`
  text-align: right;
`;
