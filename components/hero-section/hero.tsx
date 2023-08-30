import Image from 'next/image';
import { videoHost } from '../../lib/config';
import { getCleanMediaUrl } from '../../lib/utils';
import { Heading, Section, Video } from './style';
import NavigationBar from '../navigation-bar';

interface Props {
  media: string;
  imageSettings: {
    url: string;
    alt: string;
  };
  videoSettings: {
    url: string;
    type: string;
  };
  includeText: boolean;
  textSettings: {
    headline: string;
    alignment: string;
    colour: string;
  };
  location: {
    id: number;
    name: string;
  };
}

const HeroSection = (props: Props) => {
  const { media, imageSettings, videoSettings, location, includeText, textSettings } =
    props;

  const url =
    media === 'image'
      ? getCleanMediaUrl(imageSettings?.url)
      : `${videoHost}${getCleanMediaUrl(videoSettings?.url)}`;

  return (
    <Section>
      {media === 'image' ? (
        <Image src={url} alt={imageSettings.alt} layout="fill" priority />
      ) : (
        <Video src={url} />
      )}
      {includeText && (
        <Heading alignment={textSettings?.alignment} colour={textSettings?.colour}>
          {textSettings?.headline}
        </Heading>
      )}
      <NavigationBar defaultLocation={location} />
    </Section>
  );
};

export default HeroSection;
