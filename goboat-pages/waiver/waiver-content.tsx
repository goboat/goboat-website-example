import { useRouter } from 'next/router';
import useLocale from '../../hooks/use-locale';
import {
  GetWaiverQuery,
  GetWaiverSubmissionQuery,
} from '../../lib/graphql-sdk-api-gateway';
import { Heading1 } from '../../sub-components/Text';
import ShareWaiver from './share-waiver';
import SignatureFields from './signature-fields';
import { ErrorMessage, WaiverContentWrapper } from './style';
import { useEffect, useState } from 'react';
import { publicApiGatewaySdk } from '../../lib/graphql/client';

export type WaiverContentProps = {
  waiver: GetWaiverQuery['getWaiver'];
};

const WaiverContent = (props: WaiverContentProps) => {
  const locale = useLocale();
  const router = useRouter();
  const bookingId = String(router.query.bookingId);
  const versionId = String(router.query.versionId);
  const submissionId = String(router.query.submissionId);
  const [waiverSubmission, setWaiverSubmission] =
    useState<GetWaiverSubmissionQuery['getWaiverSubmission']>();
  const [loadingSubmission, setLoadingSubmission] = useState(false);

  // Fetch submission if submissionId query param is present
  useEffect(() => {
    const getWaiverSubmission = async () => {
      setLoadingSubmission(true);

      try {
        const queryResult = await publicApiGatewaySdk.getWaiverSubmission({
          id: submissionId,
        });

        if (queryResult.getWaiverSubmission) {
          setLoadingSubmission(false);
          setWaiverSubmission(queryResult.getWaiverSubmission);
        }
      } catch (error) {
        setLoadingSubmission(false);
        console.log(error);
      }
    };

    if (submissionId && submissionId !== 'undefined') {
      getWaiverSubmission();
    }
  }, [submissionId]);

  const activeVersions = props.waiver.versions.filter((version) => {
    return version.active;
  });
  const activeVersion =
    props.waiver.versions.find((version) => {
      return version.id === versionId;
    }) ||
    activeVersions.find((version) => {
      return version.language === locale;
    }) ||
    activeVersions.find((version) => {
      return version.language === 'en';
    }) ||
    activeVersions[0];

  if (!activeVersion) {
    return (
      <>
        <Heading1>{props.waiver.name}</Heading1>
        <ErrorMessage>No active version</ErrorMessage>
      </>
    );
  }

  if (!versionId && (!bookingId || !/^[a-f\d]{24}$/i.test(bookingId))) {
    return (
      <>
        <Heading1>{props.waiver.name}</Heading1>
        <ErrorMessage>Invalid booking id</ErrorMessage>
      </>
    );
  }

  return (
    <>
      {activeVersion.sharing.enabled && <ShareWaiver activeVersion={activeVersion} />}
      <WaiverContentWrapper dangerouslySetInnerHTML={{ __html: activeVersion.content }} />
      <SignatureFields
        waiver={props.waiver}
        activeVersion={activeVersion}
        submission={waiverSubmission}
        loadingSubmission={loadingSubmission}
      />

      {/* {props.waiver.type === WaiverType.Online ||
      (submissionId && submissionId !== 'undefined') ? (
        <SignatureFields
          waiver={props.waiver}
          activeVersion={activeVersion}
          submission={waiverSubmission}
          loadingSubmission={loadingSubmission}
        />
      ) : (
        <DockSignatures waiver={props.waiver} activeVersion={activeVersion} />
      )} */}
    </>
  );
};

export default WaiverContent;
