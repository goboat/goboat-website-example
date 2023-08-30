import Image from 'next/image';
import { getCleanMediaUrl } from '../../lib/utils';
import OnlyDesktop from '../only-desktop';
import OnlyMobile from '../only-mobile';
import {
  Heading,
  ImageLeft,
  ImageRight,
  Inspirational,
  Paragraph,
  Section,
} from './style';

interface HowItWorksProps {
  heading: string;
  paragraph: string;
  imageHeadingSettings: {
    url: string;
    alt: string;
  };
  imageParagraphSettings: {
    url: string;
    alt: string;
  };
}

const HowItWorks = (props: HowItWorksProps) => {
  const { heading, paragraph, imageHeadingSettings, imageParagraphSettings } = props;

  const srcLeft = getCleanMediaUrl(imageParagraphSettings?.url);
  const srcRight = getCleanMediaUrl(imageHeadingSettings?.url);

  return (
    <Section>
      <ImageLeft>
        <Image src={srcLeft} alt={imageParagraphSettings?.alt} layout="fill" />
      </ImageLeft>
      <Heading>{heading}</Heading>
      <ImageRight>
        <Image src={srcRight} alt={imageHeadingSettings?.alt} layout="fill" />
      </ImageRight>

      <OnlyMobile>
        <Paragraph>{paragraph}</Paragraph>
      </OnlyMobile>

      <OnlyDesktop>
        <Inspirational>{paragraph}</Inspirational>
      </OnlyDesktop>
    </Section>
  );
};

export default HowItWorks;
