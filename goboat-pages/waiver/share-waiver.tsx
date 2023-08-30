import { useState } from 'react';
import { WaiverPageProps } from '.';
import useLocalize from '../../hooks/use-localize';
import { Localization } from '../../lib/localizations';
import { ButtonAlign, ButtonSize } from '../../sub-components/buttons/button';
import { TextColor } from '../../sub-components/Text';
import {
  ShareWaiverButton,
  ShareWaiverContainer,
  ShareWaiverHeading,
  ShareWaiverSubText,
  ShareWaiverText,
} from './style';

interface ShareWaiverProps {
  activeVersion: WaiverPageProps['waiver']['activeVersions'][0];
}

const ShareWaiver = (props: ShareWaiverProps) => {
  const { activeVersion } = props;

  const localize = useLocalize();
  const [copied, setCopied] = useState(false);

  let waiverLink = '';
  if (typeof window !== 'undefined') waiverLink = window.location.href;

  return (
    <ShareWaiverContainer>
      <ShareWaiverHeading>{activeVersion.sharing.heading}</ShareWaiverHeading>
      <ShareWaiverText>{activeVersion.sharing.text}</ShareWaiverText>
      <ShareWaiverButton
        text={activeVersion.sharing.buttonText}
        size={ButtonSize.small}
        align={ButtonAlign.center}
        onClick={() => {
          navigator.clipboard.writeText(waiverLink);

          setCopied(true);
          setTimeout(() => setCopied(false), 5 * 1000);
        }}
      />
      <ShareWaiverSubText color={TextColor.secondary} style={{ opacity: copied ? 1 : 0 }}>
        {localize(Localization.copied)} ✓
      </ShareWaiverSubText>
    </ShareWaiverContainer>
  );
};

export default ShareWaiver;
