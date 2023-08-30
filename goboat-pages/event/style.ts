import styled from 'styled-components';
import Section from '../../components/section/section';
import { Heading2, SmallText, Text } from '../../sub-components/Text';

export const EventDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;

  /* Space between address and date on mobile */
  & > *:first-child {
    margin-bottom: 16px;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 128px;

    & > *:first-child {
      margin-bottom: 0;
    }
  }
`;

export const EventDetailsRow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  /* Space between date and button on mobile */
  @media (max-width: ${(props) => props.theme.breakpoints.tablet - 1}px) {
    :nth-child(2) {
      & > *:first-child {
        margin-bottom: 32px;
      }
    }
  }

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    /* Space between location and address + date and button on desktop */
    & > *:first-child {
      margin-bottom: 24px;
    }

    /* Make date and button be right aligned on desktop */
    :nth-child(2) {
      align-items: flex-end;
    }
  }
`;

export const EventDetail = styled(SmallText)`
  color: ${(props) => props.theme.colorTextSecondary};
  margin: 0;
`;

export const ButtonRowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 64px;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    margin-bottom: 128px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;

  --gap: 16px;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    flex-direction: row;
    justify-content: center;

    --gap: 32px;
  }

  margin: calc(-1 * var(--gap)) 0 0 calc(-1 * var(--gap));

  & > * {
    margin: var(--gap) 0 0 var(--gap);
  }
`;

export const LinkGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  & > *:first-child {
    margin-bottom: 16px;
  }
`;

export const EventDirectionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 16px;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    height: 100%;
    margin: 0;
  }
`;

export const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  aspect-ratio: 1.85/1;
  margin-bottom: 16px;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    margin: 0;
  }
`;

export const MockSleeknoteForm = styled.div`
  width: 100%;
  height: 100%;
  aspect-ratio: 16/9;
  background-color: ${(props) => props.theme.colorInactive};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LocationsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 104px;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    margin-bottom: 128px;
  }
`;

export const LocationsHeading = styled(Text)`
  margin: 0 0 32px;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    margin: 0 0 64px;
  }
`;

export const DirectionsHeading = styled(Heading2)`
  margin: 0 0 16px;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    margin: 0 0 64px;
  }
`;

export const DirectionsDetails = styled(Text)`
  margin: 0;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    margin: 32px 0;
    color: ${(props) => props.theme.colorTextSecondary};
  }
`;

export const DirectionsSection = styled(Section)`
  margin-bottom: 104px;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    margin-bottom: 128px;
  }
`;
