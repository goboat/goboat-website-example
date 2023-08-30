import Column from '../../components/section/column';
import Section from '../../components/section/section';
import { GridOptionValue } from '../../components/section/types';
import useLocalize from '../../hooks/use-localize';
import { Localization } from '../../lib/localizations';
import { SpacingValue } from '../../styles/Theme';
import Button, { ButtonSize, ButtonType } from '../../sub-components/buttons/button';
import { EventDetail, EventDetailsContainer, EventDetailsRow } from './style';

interface EventDetailsProps {
  location: string;
  date: string;
  time: string;
  address: string;
  signUpLink: string;
}

const EventDetails = (props: EventDetailsProps) => {
  const { location, date, time, address, signUpLink } = props;

  const localize = useLocalize();

  return (
    <Section
      template={[{ width: '1/6' }, { width: '2/3' }, { width: '1/6' }]}
      marginTop={SpacingValue.none}
      marginBottom={SpacingValue.none}
      paddingTop={SpacingValue.none}
      paddingBottom={SpacingValue.none}
      gridOptions={{ left: GridOptionValue.normal, right: GridOptionValue.normal }}
    >
      <Column />

      <Column>
        <EventDetailsContainer>
          <EventDetailsRow>
            <EventDetail bold>{location}</EventDetail>
            <EventDetail>{address}</EventDetail>
          </EventDetailsRow>

          <EventDetailsRow>
            <EventDetail bold>
              {date} - {time}
            </EventDetail>
            <Button
              visualType={ButtonType.secondary}
              size={ButtonSize.small}
              marginTop={SpacingValue.none}
              marginBottom={SpacingValue.none}
              text={localize(Localization.signUp)}
              link={{ url: signUpLink }}
            />
          </EventDetailsRow>
        </EventDetailsContainer>
      </Column>

      <Column />
    </Section>
  );
};

export default EventDetails;
