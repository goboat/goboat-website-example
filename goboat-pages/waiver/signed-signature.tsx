import useLocalize from '../../hooks/use-localize';
import { Localization } from '../../lib/localizations';
import { SpacingValue } from '../../styles/Theme';
import { SmallText, Text } from '../../sub-components/Text';
import { DockSignature } from './dock-signatures';

const SignedSignature = (props: { signature: DockSignature }) => {
  const { signature } = props;

  const localize = useLocalize();

  return (
    <div>
      <Text marginBottom={SpacingValue.small}>{signature.fullName}</Text>

      {signature.signingForMinors && signature.minorSignatures.length > 0 && (
        <div style={{ marginLeft: '16px', marginBottom: '32px' }}>
          <SmallText marginTop={SpacingValue.none} marginBottom={SpacingValue.small}>
            {localize(Localization.includingFollowingMinors)}
          </SmallText>

          {signature.minorSignatures.map((minorSignature) => (
            <Text
              key={minorSignature.name}
              marginTop={SpacingValue.none}
              marginBottom={SpacingValue.small}
            >
              {minorSignature.name}
            </Text>
          ))}
        </div>
      )}

      <hr />
    </div>
  );
};

export default SignedSignature;
