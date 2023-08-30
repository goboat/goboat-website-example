import { ImageLayout } from '../image/image';
import { ArticleImage, ImageWrapper, NoImage } from './style';

interface FeaturedContentImageProps {
  url: string | undefined;
  blurDataURL: string | undefined;
  text: string;
  link: string;
  disabled: boolean;
}

const ListArticleImage = (props: FeaturedContentImageProps) => {
  const { url, blurDataURL, text } = props;

  if (!url) return <NoImage>No featured image</NoImage>;

  return (
    <ImageWrapper>
      <ArticleImage
        image={{
          url: url,
          blurDataURL: blurDataURL,
        }}
        layout={ImageLayout.fill}
        objectFit="cover"
        altText={text}
      />
    </ImageWrapper>
  );
};

export default ListArticleImage;
