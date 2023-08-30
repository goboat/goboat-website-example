import React from 'react';
import styled from 'styled-components';
import { WaiverPageProps } from '.';
import useLocalize from '../../hooks/use-localize';
import { AgreementInput } from '../../lib/graphql-sdk-api-gateway';
import { Localization } from '../../lib/localizations';
import Checkbox, { CheckboxProps } from '../../sub-components/checkbox';
import Input, { InputProps } from '../../sub-components/input';

export interface WaiverCheckboxesProps {
  checkboxes: WaiverPageProps['waiver']['versions'][0]['checkboxes'];
  agreements: AgreementInput[];
  setAgreements: (agreement: AgreementInput[]) => void;
  disabled: boolean;
}

const StyledWrapper = styled.div`
  margin: 32px 0;
`;

const StyledCheckboxContainer = styled.div<{ omitInPrint?: boolean }>`
  @media print {
    break-inside: avoid;
    display: ${(props) => (props.omitInPrint ? 'none' : 'block')};
  }
`;

const WaiverCheckboxes = (props: WaiverCheckboxesProps) => {
  const inSync = props.checkboxes.every((checkbox) => {
    return props.agreements.some((agreement) => {
      return checkbox.name === agreement.name;
    });
  });

  if (!inSync) {
    props.setAgreements(
      props.checkboxes.map((checkbox) => {
        return {
          name: checkbox.name,
          accepted: false,
          signature: '',
        };
      })
    );
  }

  const localize = useLocalize();

  const boxes = props.checkboxes.map((checkbox) => {
    const agreement = props.agreements.find((agreement) => {
      return agreement.name === checkbox.name;
    });

    if (!agreement) {
      console.warn('Agreements and checkboxes out of sync');
      return null;
    }

    const checkboxProps: CheckboxProps = {
      checked: agreement.accepted,
      onChange: (checked) => {
        const otherAgreements = props.agreements.filter((agreement) => {
          return agreement.name !== checkbox.name;
        });
        const newAgreement: AgreementInput = {
          name: checkbox.name,
          accepted: checked,
          signature: '',
        };
        props.setAgreements([...otherAgreements, newAgreement]);
      },
      label: checkbox.text,
      id: checkbox.name,
      required: true,
      disabled: props.disabled,
    };

    const signatureInputProps: InputProps = {
      type: 'text',
      value: agreement.signature || '',
      onChange: (signature) => {
        const otherAgreements = props.agreements.filter((agreement) => {
          return agreement.name !== checkbox.name;
        });

        const newAgreements = [
          ...otherAgreements,
          {
            ...agreement,
            signature,
          },
        ];

        props.setAgreements(newAgreements);
      },
      placeholder: localize(Localization.waiverFullName),
      required: true,
    };

    return (
      <StyledCheckboxContainer key={checkbox.name} omitInPrint={checkbox.omitInPrint}>
        <Checkbox {...checkboxProps} />
        {checkbox.signature ? <Input {...signatureInputProps} /> : null}
      </StyledCheckboxContainer>
    );
  });
  return <StyledWrapper>{boxes}</StyledWrapper>;
};

export default WaiverCheckboxes;
