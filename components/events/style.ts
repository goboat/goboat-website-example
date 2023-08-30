import styled from 'styled-components';

import SelectedTags from '../../sub-components/selected-tags';
import { Heading2, Heading3, SmallText, Text } from '../../sub-components/Text';
import ArrowIcon from '../icons/arrow';
import { default as EventsFilterComponent } from '../events-filter/filter';
import Image from '../image/image';
import Column from '../section/column';

export const SpinnerContainer = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 200px;
  height: 128px;
`;

export const CitySelector = styled(SelectedTags)`
  margin-bottom: 0 !important;
  grid-column: 1 / -1;
  align-self: start;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    grid-column: 1 / 7;
  }
`;

export const EventsFilter = styled(EventsFilterComponent)`
  grid-column: 1 / -1;
  align-self: start;
  margin-top: 32px;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    justify-self: end;
    grid-column: 7 / -1;
    margin-top: 0;
  }
`;

export const SubGridContainer = styled(Column)`
  display: inherit;
  grid-template-columns: inherit;
  grid-gap: inherit;
  grid-column: 1 / -1;
`;

export const EventLink = styled.a`
  display: inherit;
  grid-template-columns: inherit;
  grid-gap: inherit;
  grid-column: 1 / -1;

  &:first-of-type {
    margin-top: 64px;
  }

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    &:first-of-type {
      margin-top: 130px;
    }
  }
`;

export const ListEventContainer = styled.article`
  height: 386px;
  border-top: 1px solid ${(props) => props.theme.colorBorder};
  grid-column: 1 / -1;
  display: inherit;
  grid-template-columns: inherit;
  grid-gap: inherit;
  grid-template-rows: auto auto 1fr auto auto;
  cursor: pointer;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    height: 532px;
    grid-template-rows: auto auto auto auto 1fr;
  }
`;

export const EventDate = styled(Heading3)`
  grid-column: 1 / -1;
  margin: 8px 0 0;
  position: relative;
  z-index: 2;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    transition: color 0.3s;
    color: ${(props) => props.theme.colors.dark};
    grid-column: 1 / 6;
    grid-row: 1;
    margin: 24px 0 0 8px;

    ${ListEventContainer}:hover && {
      color: ${(props) => props.theme.colors.white};
    }
  }
`;

export const EventTime = styled(SmallText)`
  grid-column: 3 / -1;
  text-align: right;
  margin: 16px 0 0;
  grid-row: 1;
  position: relative;
  z-index: 2;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    transition: color 0.3s;
    color: ${(props) => props.theme.colors.dark};
    grid-column: 1 / 6;
    text-align: left;
    grid-row: 2;
    margin-left: 8px;

    ${ListEventContainer}:hover && {
      color: ${(props) => props.theme.colors.white};
    }
  }
`;

export const EventCategory = styled(SmallText)`
  grid-column: 1 / 3;
  margin: 16px 0 0;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    grid-column: 6 / -2;
    text-align: left;
    margin: 24px 0 0;
  }
`;

export const EventTitle = styled(Heading2)`
  grid-column: 1 / -1;
  margin: 8px 0 40px;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    margin: 0;
    grid-column: 6 / -2;
    grid-row: 2;
  }
`;

export const EventAddress = styled(SmallText)`
  grid-column: 1 / -1;
  margin: 8px 0 0;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    grid-column: 6 / -2;
    grid-row: 4;
    margin: 16px 0;
  }
`;

export const EventDescription = styled(Text)`
  display: none;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    display: block;
    grid-column: 6 / -2;
    grid-row: 5;
    margin: 0;
  }
`;

export const EventImageWrapper = styled.div`
  grid-column: 1 / -1;
  position: relative;
  padding: 8px 0;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    transition: opacity 0.3s;
    opacity: 0;
    grid-column: 1 / 6;
    grid-row: 1 / 6;
    margin: 0;

    ${ListEventContainer}:hover && {
      opacity: 1;
    }
  }
`;

export const EventImage = styled(Image)`
  position: relative;
  height: 100%;
  margin: 0;
`;

export const ImageOverlay = styled.div`
  display: none;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    --offset: 8px;
    display: block;
    position: absolute;
    top: var(--offset);
    left: 0;
    width: 100%;
    height: calc(100% - 2 * var(--offset));
    z-index: 1;
    background: linear-gradient(rgba(51, 50, 51, 0.5) 0%, rgba(51, 50, 51, 0) 25%);
  }
`;

export const EventArrow = styled(ArrowIcon)`
  display: none;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    display: block;
    opacity: 0;
    transition: opacity 0.3s;
    grid-column: 12 / 13;
    grid-row: 1 / -1;
    align-self: center;

    ${ListEventContainer}:hover && {
      opacity: 1;
    }
  }
`;

export const LoadMoreButton = styled.button`
  background: transparent;
  border: none;
  outline: none;
  margin: auto;
  display: block;
  cursor: pointer;
  padding: ${(props) => props.theme.spacing.mediumXX}px 0;
  font-size: ${(props) => props.theme.fontSizes.mobile.smallText};
  grid-column: 1 / -1;
`;
