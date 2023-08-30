import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { WaiverPageProps } from '.';
import useLocalize from '../../hooks/use-localize';
import { AgreementInput, MinorSignature } from '../../lib/graphql-sdk-api-gateway';
import { publicApiGatewaySdk } from '../../lib/graphql/client';
import { Localization } from '../../lib/localizations';
import Button, { ButtonProps, ButtonSize } from '../../sub-components/buttons/button';
import Checkbox from '../../sub-components/checkbox';
import Input, { DateInput, DateInputProps, InputProps } from '../../sub-components/input';
import Spinner from '../../sub-components/spinner';
import MinorSignatures from './minor-signatures';
import {
  MinorSignaturesCheckboxWrapper,
  PrintCssSignatureContainer,
  WaiverButtonContainer,
} from './style';
import WaiverCheckboxes from './waiver-checkboxes';
import { Heading2 } from '../../sub-components/Text';
import { SpacingValue } from '../../styles/Theme';
import SignedSignature from './signed-signature';

const getBirthDate = (dateString: string) => {
  const date = new Date(dateString);

  // Check if valid date
  if (date instanceof Date && !isNaN(Number(date))) {
    return date.toISOString();
  }

  return undefined;
};

type DockSignatureKey =
  | 'email'
  | 'fullName'
  | 'phone'
  | 'birthDate'
  | 'state'
  | 'zip'
  | 'agreements'
  | 'signingForMinors'
  | 'minorSignatures'
  | 'isSigned';

type DockSignatureValue = string | boolean | AgreementInput[] | MinorSignature[];

export interface DockSignature {
  email: string;
  fullName: string;
  phone: string;
  birthDate: string;
  state: string;
  zip: string;
  agreements: AgreementInput[];
  signingForMinors: boolean;
  minorSignatures: MinorSignature[];
  isSigned: boolean;
}

const defaultSignature: DockSignature = {
  email: '',
  fullName: '',
  phone: '',
  birthDate: '',
  state: '',
  zip: '',
  agreements: [],
  signingForMinors: false,
  minorSignatures: [],
  isSigned: false,
};

export interface DockSignaturesProps extends WaiverPageProps {
  activeVersion: WaiverPageProps['waiver']['versions'][0];
}

const DockSignatures = (props: DockSignaturesProps) => {
  const router = useRouter();
  const localize = useLocalize();

  const bookingId = String(router.query.bookingId);
  const formRef = useRef<HTMLFormElement | null>(null);
  const crewFormRef = useRef<HTMLFormElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [signatures, setSignatures] = useState<DockSignature[]>([defaultSignature]);
  const [crewFullName, setCrewFullName] = useState('');

  // props for input components
  const nameInputProps: Omit<InputProps, 'value' | 'onChange'> = {
    type: 'text',
    label: localize(Localization.waiverFullName),
    placeholder: localize(Localization.waiverFullName),
    required: true,
  };

  const emailInputProps: Omit<InputProps, 'value' | 'onChange'> = {
    type: 'email',
    label: 'Email',
    placeholder: 'Email',
    required: true,
  };

  const stateInputProps: Omit<InputProps, 'value' | 'onChange'> = {
    type: 'text',
    label: localize(Localization.waiverState),
    placeholder: localize(Localization.waiverState),
    required: true,
  };

  const zipInputProps: Omit<InputProps, 'value' | 'onChange'> = {
    type: 'text',
    label: localize(Localization.waiverZip),
    placeholder: localize(Localization.waiverZip),
    required: true,
  };

  const phoneInputProps: Omit<InputProps, 'value' | 'onChange'> = {
    type: 'tel',
    label: localize(Localization.waiverPhone),
    placeholder: localize(Localization.waiverPhone),
    required: true,
  };

  const crewNameInputProps: InputProps = {
    value: crewFullName,
    onChange: setCrewFullName,
    type: 'text',
    label: localize(Localization.waiverFullName),
    placeholder: localize(Localization.waiverFullName),
    required: true,
  };

  /**
   * Max date for birth date
   * So users don't have to sroll back from today to their birth date
   */
  const maxBirthDate = new Date();
  maxBirthDate.setFullYear(new Date().getFullYear() - 17);
  const maxBirthDateFormatted = `${maxBirthDate.getFullYear()}-01-01`;

  const birthDateInputProps: Omit<DateInputProps, 'value' | 'onChange'> = {
    type: 'date',
    label: localize(Localization.waiverBirthDate),
    placeholder: localize(Localization.waiverBirthDate),
    max: maxBirthDateFormatted,
    min: '1910-01-01',
    required: true,
  };

  // props for buttons
  const signWaiverButtonProps: ButtonProps = {
    text: localize(Localization.signWaiver),
    size: ButtonSize.small,
    disabled: loading,
    marginTop: SpacingValue.medium,
    marginBottom: SpacingValue.medium,
    htmlType: 'submit',
  };

  const addSignatureButtonProps: ButtonProps = {
    text: localize(Localization.addSignature),
    size: ButtonSize.small,
    disabled: loading,
    marginTop: SpacingValue.medium,
    marginBottom: SpacingValue.medium,
    onClick: () => setSignatures((signatures) => [...signatures, defaultSignature]),
  };

  const crewConfirmButtonProps: ButtonProps = {
    text: localize(Localization.confirmSignatures),
    size: ButtonSize.small,
    disabled: loading,
    htmlType: 'submit',
  };

  // event functions
  const setSignatureValue = (
    key: DockSignatureKey,
    value: DockSignatureValue,
    index: number
  ) => {
    const updatedSignature = {
      ...signatures[index],
      [key]: value,
    };

    const updatedSignatures = [...signatures];

    updatedSignatures.splice(index, 1, updatedSignature);

    setSignatures(updatedSignatures);
  };

  const onSignWaiver = (e: React.FormEvent<HTMLFormElement>, index: number) => {
    e.preventDefault();

    setSignatureValue('isSigned', true, index);
  };

  const onCrewConfirmation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await publicApiGatewaySdk.submitDockTypeWaiver({
        bookingId,
        waiverVersionId: props.activeVersion.id,
        signatures: signatures.map((signature) => ({
          fullName: signature.fullName,
          email: signature.email,
          data: {
            state: signature.state,
            birthDate: getBirthDate(signature.birthDate),
            phone: signature.phone,
            zip: signature.zip,
          },
          minors: signature.minorSignatures,
          agreements: signature.agreements,
        })),
        crewSignature: { fullName: crewFullName },
      });

      if (response.submitDockTypeWaiver) {
        router.push(props.activeVersion.confirmationPage);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <>
      {signatures.some((signature) => signature.isSigned) && (
        <div style={{ marginBottom: '32px' }}>
          <Heading2>{localize(Localization.waiverSignedBy)}</Heading2>

          {signatures.map(
            (signature, index) =>
              signature.isSigned && (
                <SignedSignature
                  key={`signed-signature-${index}`}
                  signature={signature}
                />
              )
          )}
        </div>
      )}

      {signatures.map(
        (signature, index) =>
          !signature.isSigned && (
            <form
              name="electronic-signature"
              ref={formRef}
              id="electronic-signature-form"
              key={`customer-signature-${index}`}
              onSubmit={(e) => onSignWaiver(e, index)}
            >
              <Input
                {...nameInputProps}
                value={signature.fullName}
                onChange={(value) => setSignatureValue('fullName', value, index)}
              />
              {props.activeVersion.fields.email ? (
                <Input
                  {...emailInputProps}
                  value={signature.email}
                  onChange={(value) => setSignatureValue('email', value, index)}
                />
              ) : null}
              {props.activeVersion.fields.phone ? (
                <Input
                  {...phoneInputProps}
                  value={signature.phone}
                  onChange={(value) => setSignatureValue('phone', value, index)}
                />
              ) : null}
              {props.activeVersion.fields.birthDate ? (
                <DateInput
                  {...birthDateInputProps}
                  value={signature.birthDate}
                  onChange={(value) => setSignatureValue('birthDate', value, index)}
                />
              ) : null}
              {props.activeVersion.fields.state ? (
                <Input
                  {...stateInputProps}
                  value={signature.state}
                  onChange={(value) => setSignatureValue('state', value, index)}
                />
              ) : null}
              {props.activeVersion.fields.zip ? (
                <Input
                  {...zipInputProps}
                  value={signature.zip}
                  onChange={(value) => setSignatureValue('zip', value, index)}
                />
              ) : null}

              <MinorSignaturesCheckboxWrapper
                disabled={props.activeVersion.disableMinorSignatures}
              >
                <Checkbox
                  checked={signature.signingForMinors}
                  onChange={(value) =>
                    setSignatureValue('signingForMinors', value, index)
                  }
                  label={localize(Localization.signingForMinors)}
                  id="signing-for-minors"
                />
              </MinorSignaturesCheckboxWrapper>
              <MinorSignatures
                minorSignatures={signature.minorSignatures}
                setMinorSignatures={(value) =>
                  setSignatureValue('minorSignatures', value, index)
                }
                visible={signature.signingForMinors}
                requireMinorBirthDate={props.activeVersion.requireMinorBirthDate}
              />

              <WaiverCheckboxes
                checkboxes={props.activeVersion.checkboxes}
                agreements={signature.agreements}
                setAgreements={(value) => setSignatureValue('agreements', value, index)}
                disabled={false}
              />

              <Button {...signWaiverButtonProps} />
            </form>
          )
      )}

      {signatures.every((signature) => signature.isSigned) && (
        <Button {...addSignatureButtonProps} />
      )}

      <Heading2 style={{ marginTop: '64px' }}>
        {localize(Localization.crewSignature)}
      </Heading2>
      <form
        name="crew-signature"
        ref={crewFormRef}
        id="crew-signature-form"
        onSubmit={onCrewConfirmation}
      >
        <Input {...crewNameInputProps} />

        <WaiverButtonContainer>
          <Button {...crewConfirmButtonProps} />
          {loading && <Spinner />}
        </WaiverButtonContainer>
      </form>

      <PrintCssSignatureContainer>
        <Input
          label={localize(Localization.signature)}
          value=""
          onChange={() => null}
          type="text"
        />
        <Input
          label={localize(Localization.date)}
          value=""
          onChange={() => null}
          type="text"
        />
        <Input
          label={localize(Localization.signingForMinors)}
          value=""
          onChange={() => null}
          type="text"
        />
      </PrintCssSignatureContainer>
    </>
  );
};

export default DockSignatures;
