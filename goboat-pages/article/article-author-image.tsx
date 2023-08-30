import styled from 'styled-components';
import Image, { ImageLayout, ImageProps } from '../../components/image/image';

const StyledImage = styled(Image)`
  border-radius: 360px;
  width: 48px;
  height: 48px;
  margin-bottom: 0;

  img {
    border-radius: 360px;
  }

  grid-row: 1;
  grid-column: 1 / -1;
  @media screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    grid-column: 3 / span 4;
  }
`;

const NoImage = styled.div`
  background: ${(props) => props.theme.colorSecondary};
  width: 48px;
  height: 48px;
  border-radius: 360px;
`;

interface ArticleAuthorImageProps {
  src?: string;
}

const ArticleAuthorImage = (props: ArticleAuthorImageProps) => {
  if (!props.src) {
    return <NoImage />;
  }
  const imageProps: ImageProps = {
    image: {
      url: props.src,
      height: 48,
      width: 48,
    },
    layout: ImageLayout.fixed,
    loader: (props) => {
      return `https://secure.gravatar.com${props.src}`;
    },
  };

  return (
    <>
      <StyledImage {...imageProps} />
    </>
  );
};

export default ArticleAuthorImage;
