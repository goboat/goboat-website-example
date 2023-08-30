import NextImage, { ImageLoader, ImageProps as NextImageProps } from 'next/image';
import { DefaultTheme, useTheme } from 'styled-components';
import { Link } from '../../sub-components/Text';
import { ImageAttribution, ImageCaption, ImageWrapper } from './style';
import { VisibilityOptions } from '../../lib/types';
import { getCleanMediaUrl } from '../../lib/utils';
import useLocalize from '../../hooks/use-localize';
import { Localization } from '../../lib/localizations';
import Spacer from '../spacer';

export type ContentImage = {
  alt?: string | boolean;
  width?: number;
  height?: number;
  url: string;
  blurDataURL?: string;
  attribution?: string;
};

export enum ImageLayout {
  intrinsic = 'intrinsic',
  fixed = 'fixed',
  responsive = 'responsive',
  fill = 'fill',
}

export type ImageProps = {
  image: ContentImage;
  alt?: string;
  altText?: string;
  imageText?: string;
  link?: {
    url: string;
  };
  className?: string;
  layout?: ImageLayout;
  objectFit?: NextImageProps['objectFit'];
  children?: any;
  loader?: ImageLoader;
  float?: 'none' | 'left' | 'right';
  sizes?: NextImageProps['sizes'];
  visibility?: VisibilityOptions;
  priority?: boolean;
  includeAttribution?: boolean;
  imageTextAlignment?: 'left' | 'right';
};

const getSizes = (props: ImageProps, theme: DefaultTheme) => {
  if (props.float && /left|right/.test(props.float)) {
    return `(max-width: ${theme.breakpoints.tablet}px) 100vw, 33vw`;
  }
  return '100vw';
};

const Image = (props: ImageProps) => {
  const theme = useTheme();
  const src = getCleanMediaUrl(props.image?.url);
  const localize = useLocalize();

  if (!src) return null;

  const imageProps: NextImageProps = {
    src,
    alt: props.altText || props.alt || '',
    layout: props.layout || ImageLayout.responsive,
    objectFit: props.objectFit,
    loader: props.loader,
    sizes: props.sizes || getSizes(props, theme),
    priority: props.priority,
  };

  if (props.image.width) imageProps.width = props.image.width;
  if (props.image.height) imageProps.height = props.image.height;

  if (props.image?.blurDataURL) {
    imageProps.placeholder = 'blur';
    imageProps.blurDataURL = props.image.blurDataURL;
  }

  const imageTextAlignment = props.imageTextAlignment || 'right';

  const Caption = props.imageText ? (
    <ImageCaption alignment={imageTextAlignment}>{props.imageText}</ImageCaption>
  ) : null;

  const Attribution = props.includeAttribution ? (
    <ImageAttribution alignment={imageTextAlignment}>
      {localize(Localization.photoAttribution)}: {props.image.attribution}
    </ImageAttribution>
  ) : null;

  const wrapperProps = {
    className: props.className,
    visibility: props.visibility,
    float: props.float,
  };

  if (props.link?.url) {
    return (
      <ImageWrapper {...wrapperProps}>
        <Link href={props.link?.url}>
          <NextImage {...imageProps} />
          {Caption || Attribution ? <Spacer height="8px" /> : null}
          {Caption}
          {Attribution}
        </Link>
        {props.children && props.children}
      </ImageWrapper>
    );
  }

  return (
    <ImageWrapper {...wrapperProps}>
      <NextImage {...imageProps} />
      {Caption || Attribution ? <Spacer height="8px" /> : null}
      {Caption}
      {Attribution}
      {props.children && props.children}
    </ImageWrapper>
  );
};

export default Image;
