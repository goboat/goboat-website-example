import { useRouter } from 'next/router';
import styled from 'styled-components';
import { StyledLink } from '../sub-components/Text';

const StopPreviewContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  padding: 16px;

  background: ${(props) => props.theme.colorTextSecondary};
`;

const StopPreviewLink = styled(StyledLink)`
  color: ${(props) => props.theme.colorLight};
`;

const StopPreview = () => {
  const router = useRouter();

  return (
    <a href={`/api/stop-preview?redirect=${router.asPath}`}>
      <StopPreviewContainer>
        <StopPreviewLink as="span">Stop preview</StopPreviewLink>
      </StopPreviewContainer>
    </a>
  );
};

export default StopPreview;
