import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { WaiverPageProps } from '.';
import useLocalize from '../../hooks/use-localize';
import {
  AgreementInput,
  GetWaiverSubmissionQuery,
  MinorSignature,
} from '../../lib/graphql-sdk-api-gateway';
import { publicApiGatewaySdk } from '../../lib/graphql/client';
import { Localization } from '../../lib/localizations';
import Button, { ButtonProps, ButtonSize } from '../../sub-components/buttons/button';
import Checkbox, { CheckboxProps } from '../../sub-components/checkbox';
import Input, { DateInput, DateInputProps, InputProps } from '../../sub-components/input';
import Spinner from '../../sub-components/spinner';
import MinorSignatures, { MinorSignaturesProps } from './minor-signatures';
import {
  MinorSignaturesCheckboxWrapper,
  PrintCssSignatureContainer,
  WaiverButtonContainer,
} from './style';
import WaiverCheckboxes from './waiver-checkboxes';

const getBirthDate = (dateString: string) => {
  const date = new Date(dateString);

  // Check if valid date
  if (date instanceof Date && !isNaN(Number(date))) {
    return date.toISOString();
  }

  return undefined;
};

const formatBirthDate = (dateString?: string) => {
  if (!dateString) return null;

  return dateString.split('T')[0];
};

export interface SignatureFieldsProps extends WaiverPageProps {
  activeVersion: WaiverPageProps['waiver']['versions'][0];
  submission?: GetWaiverSubmissionQuery['getWaiverSubmission'];
  loadingSubmission?: boolean;
}

const SignatureFields = (props: SignatureFieldsProps) => {
  const router = useRouter();
  const localize = useLocalize();
  const bookingId = String(router.query.bookingId);

  const { activeVersion, submission, loadingSubmission } = props;

  const formRef = useRef<HTMLFormElement | null>(null);
  const [loading, setLoading] = useState(false);

  /**
   * Input states
   */
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [agreements, setAgreements] = useState<AgreementInput[]>([]);
  const [signingForMinors, setSigningForMinors] = useState(false);
  const [minorSignatures, setMinorSignatures] = useState<MinorSignature[]>([]);

  // props for input components
  const emailInputProps: InputProps = {
    value: submission?.email ?? email,
    onChange: setEmail,
    type: 'email',
    label: 'Email',
    placeholder: 'Email',
    required: true,
    disabled: Boolean(submission?.id),
  };

  const nameInputProps: InputProps = {
    value: submission?.fullName ?? fullName,
    onChange: setFullName,
    type: 'text',
    label: localize(Localization.waiverFullName),
    placeholder: localize(Localization.waiverFullName),
    required: true,
    disabled: Boolean(submission?.id),
  };

  const stateInputProps: InputProps = {
    value: submission?.state ?? state,
    onChange: setState,
    type: 'text',
    label: localize(Localization.waiverState),
    placeholder: localize(Localization.waiverState),
    required: true,
    disabled: Boolean(submission?.id),
  };

  const zipInputProps: InputProps = {
    value: submission?.zip ?? zip,
    onChange: setZip,
    type: 'text',
    label: localize(Localization.waiverZip),
    placeholder: localize(Localization.waiverZip),
    required: true,
    disabled: Boolean(submission?.id),
  };

  const phoneInputProps: InputProps = {
    value: submission?.phone ?? phone,
    onChange: setPhone,
    type: 'tel',
    label: localize(Localization.waiverPhone),
    placeholder: localize(Localization.waiverPhone),
    required: true,
    disabled: Boolean(submission?.id),
  };

  /**
   * Max date for birth date
   * So users don't have to sroll back from today to their birth date
   */
  const maxBirthDate = new Date();
  maxBirthDate.setFullYear(new Date().getFullYear() - 17);
  const maxBirthDateFormatted = `${maxBirthDate.getFullYear()}-01-01`;

  const birthDateInputProps: DateInputProps = {
    value: formatBirthDate(submission?.birthDate) ?? birthDate,
    onChange: setBirthDate,
    type: 'date',
    label: localize(Localization.waiverBirthDate),
    placeholder: localize(Localization.waiverBirthDate),
    max: maxBirthDateFormatted,
    min: '1910-01-01',
    required: true,
    disabled: Boolean(submission?.id),
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await publicApiGatewaySdk.submitWaiver({
        fullName,
        bookingId,
        waiverVersionId: activeVersion.id,
        email,
        data: {
          phone,
          birthDate: getBirthDate(birthDate),
          state,
          zip,
        },
        agreements,
        minors: minorSignatures,
      });

      if (response.submitWaiver.id) {
        router.push(activeVersion.confirmationPage);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const buttonProps: ButtonProps = {
    text: localize(Localization.signWaiver),
    size: ButtonSize.small,
    disabled: loading || Boolean(submission?.id),
    htmlType: 'submit',
  };

  const signingForMinorsToggleCheckboxProps: CheckboxProps = {
    checked: signingForMinors,
    onChange: (checked) => {
      if (checked && minorSignatures.length < 1) {
        setMinorSignatures([{ name: '' }]);
      }
      setSigningForMinors(checked);
    },
    label: localize(Localization.signingForMinors),
    id: 'signing-for-minors',
    disabled: Boolean(submission?.id),
  };

  const minorSignaturesProps: MinorSignaturesProps = {
    minorSignatures,
    setMinorSignatures,
    visible: signingForMinors,
    requireMinorBirthDate: activeVersion.requireMinorBirthDate,
    disabled: Boolean(submission?.id),
  };

  // Set agreements and minors after submission loads
  useEffect(() => {
    if (submission && submission.agreements.length > 0) {
      setAgreements(submission.agreements);
    }

    if (submission && submission.minors.length > 0) {
      setSigningForMinors(true);
      setMinorSignatures(
        submission.minors.map((minor) => ({
          name: minor.name,
          birthDate: formatBirthDate(minor.birthDate),
        }))
      );
    }
  }, [submission]);

  if (loadingSubmission === true) return <Spinner />;

  return (
    <>
      <form
        name="electronic-signature"
        ref={formRef}
        id="electronic-signature-form"
        onSubmit={onSubmit}
      >
        <Input {...nameInputProps} />

        {activeVersion.fields.email ? <Input {...emailInputProps} /> : null}
        {activeVersion.fields.phone ? <Input {...phoneInputProps} /> : null}
        {activeVersion.fields.birthDate ? <DateInput {...birthDateInputProps} /> : null}
        {activeVersion.fields.state ? <Input {...stateInputProps} /> : null}
        {activeVersion.fields.zip ? <Input {...zipInputProps} /> : null}

        <MinorSignaturesCheckboxWrapper disabled={activeVersion.disableMinorSignatures}>
          <Checkbox {...signingForMinorsToggleCheckboxProps} />
        </MinorSignaturesCheckboxWrapper>
        <MinorSignatures {...minorSignaturesProps} />

        <WaiverCheckboxes
          checkboxes={activeVersion.checkboxes}
          agreements={agreements}
          setAgreements={setAgreements}
          disabled={Boolean(submission?.id)}
        />

        <WaiverButtonContainer>
          <Button {...buttonProps} />
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

export default SignatureFields;
