import React, { Dispatch, SetStateAction, useEffect } from 'react';
import useLocalize from '../../hooks/use-localize';
import { MinorSignature } from '../../lib/graphql-sdk-api-gateway';
import { Localization } from '../../lib/localizations';
import { SpacingValue } from '../../styles/Theme';
import Button, { ButtonProps, ButtonSize } from '../../sub-components/buttons/button';
import Input, { DateInput, DateInputProps, InputProps } from '../../sub-components/input';
import { MinorStyledRow, MinorWrapper, MinorsWrapper, RemoveMinorButton } from './style';

export interface MinorSignaturesProps {
  minorSignatures: MinorSignature[];
  setMinorSignatures: (minorSignatures: MinorSignature[]) => void;
  visible: boolean;
  requireMinorBirthDate: boolean;
  disabled?: boolean;
}

const MinorSignatures = (props: MinorSignaturesProps) => {
  useEffect(() => {
    if (!props.visible) {
      props.setMinorSignatures([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.visible]);

  const localize = useLocalize();

  if (!props.visible) return null;

  return (
    <MinorsWrapper>
      {props.minorSignatures.map((minorSignature, index) => {
        const inputProps: InputProps = {
          value: minorSignature.name,
          onChange: (value) => {
            const newMinorSignatures = [...props.minorSignatures];
            newMinorSignatures[index].name = value;
            props.setMinorSignatures(newMinorSignatures);
          },
          type: 'text',
          label: localize(Localization.waiverFullName),
          placeholder: localize(Localization.waiverFullName),
          marginBottom: props.requireMinorBirthDate
            ? SpacingValue.small
            : SpacingValue.none,
          marginTop: SpacingValue.none,
          required: true,
          disabled: props.disabled,
        };

        const removeButtonProps: ButtonProps = {
          size: ButtonSize.extraSmall,
          onClick: () => {
            props.setMinorSignatures(
              props.minorSignatures.filter((_, i) => {
                return i !== index;
              })
            );
          },
          text: `✕ ${localize(Localization.remove)}`,
          disabled: props.disabled,
        };

        const birthDateInputProps: DateInputProps = {
          value: minorSignature.birthDate,
          onChange: (value) => {
            const newMinorSignatures = [...props.minorSignatures];
            newMinorSignatures[index].birthDate = value;
            props.setMinorSignatures(newMinorSignatures);
          },
          type: 'date',
          label: localize(Localization.waiverBirthDate),
          placeholder: localize(Localization.waiverBirthDate),
          max: `${new Date().getUTCFullYear()}-${
            new Date().getMonth() + 1
          }-${new Date().getDate()}`,
          min: `${new Date().getUTCFullYear() - 18}-01-01`,
          required: true,
          marginBottom: SpacingValue.none,
          marginTop: SpacingValue.none,
          disabled: props.disabled,
        };

        return (
          <MinorWrapper key={index}>
            <MinorStyledRow key={index}>
              <div style={{ width: '100%' }}>
                <Input {...inputProps} />
                {props.requireMinorBirthDate && <DateInput {...birthDateInputProps} />}
              </div>

              <RemoveMinorButton {...removeButtonProps} />
            </MinorStyledRow>
          </MinorWrapper>
        );
      })}

      <Button
        size={ButtonSize.extraSmall}
        onClick={() => props.setMinorSignatures([...props.minorSignatures, { name: '' }])}
        text={`＋ ${localize(Localization.addMinor)}`}
        marginTop={SpacingValue.none}
        marginBottom={SpacingValue.none}
        disabled={props.disabled}
      />
    </MinorsWrapper>
  );
};

export default MinorSignatures;
