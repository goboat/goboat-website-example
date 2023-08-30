import OnlyDesktop from '../../components/only-desktop';
import OnlyMobile from '../../components/only-mobile';
import Column from '../../components/section/column';
import Section from '../../components/section/section';
import { GridOptionValue } from '../../components/section/types';
import useLocalize from '../../hooks/use-localize';
import { Localization } from '../../lib/localizations';
import { SpacingValue } from '../../styles/Theme';
import Button, { ButtonSize, ButtonType } from '../../sub-components/buttons/button';
import { Link } from '../../sub-components/Text';
import { ButtonGroup, ButtonRowContainer, LinkGroup } from './style';

interface ButtonRowProps {
  links: {
    google?: string;
    ical?: string;
    signUp: string;
  };
}

const EventButtons = (props: ButtonRowProps) => {
  const { google, ical, signUp } = props.links;

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
        <ButtonRowContainer>
          <OnlyDesktop>
            <ButtonGroup>
              {google && (
                <Button
                  visualType={ButtonType.secondary}
                  size={ButtonSize.small}
                  marginTop={SpacingValue.none}
                  marginBottom={SpacingValue.none}
                  text={localize(Localization.googleCalendar)}
                  link={{ url: google, target: '_blank' }}
                />
              )}
              {ical && (
                <Button
                  visualType={ButtonType.secondary}
                  size={ButtonSize.small}
                  marginTop={SpacingValue.none}
                  marginBottom={SpacingValue.none}
                  text={localize(Localization.saveAsIcal)}
                  link={{ url: ical, target: '_blank' }}
                />
              )}
            </ButtonGroup>
          </OnlyDesktop>

          <Button
            visualType={ButtonType.secondary}
            size={ButtonSize.small}
            marginTop={SpacingValue.none}
            marginBottom={SpacingValue.none}
            text={localize(Localization.signUp)}
            link={{ url: signUp }}
          />

          <OnlyMobile>
            <LinkGroup>
              {google && (
                <Link href={google} target="_blank" arrow>
                  {localize(Localization.googleCalendar)}
                </Link>
              )}
              {ical && (
                <Link href={ical} target="_blank" arrow>
                  {localize(Localization.saveAsIcal)}
                </Link>
              )}
            </LinkGroup>
          </OnlyMobile>
        </ButtonRowContainer>
      </Column>

      <Column />
    </Section>
  );
};

export default EventButtons;
