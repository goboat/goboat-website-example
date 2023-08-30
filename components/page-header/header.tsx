import { ImageLayout } from '../image/image';
import Section from '../section/section';
import {
  Caption,
  HeaderImage,
  HeaderVideo,
  Heading,
  MediaWrapper,
  TextWrapper,
} from './style';
import { SpacingValue } from '../../styles/Theme';
import { GridOptionValue } from '../section/types';
import Column from '../section/column';
import { videoHost } from '../../lib/config';
import { getCleanMediaUrl } from '../../lib/utils';
import useLocalize from '../../hooks/use-localize';
import { Localization } from '../../lib/localizations';

interface Props {
  heading: string;
  image?: {
    url?: string;
    blurDataURL?: string;
    alt?: string;
    attribution?: string;
  };
  video?: {
    url?: string;
    type?: string;
    attribution?: string;
  };
  sourceText?: string;
  includeAttribution?: boolean;
}

const PageHeader = (props: Props) => {
  const { heading, image, video, sourceText } = props;
  const localize = useLocalize();

  const haveMedia = image?.url || video?.url;

  const videoURL = `${videoHost}${getCleanMediaUrl(video?.url)}`;
  const media = image || video;

  return (
    <>
      {haveMedia && (
        <MediaWrapper>
          {image?.url && (
            <HeaderImage
              image={{ url: image.url, blurDataURL: image.blurDataURL }}
              altText={image.alt}
              layout={ImageLayout.fill}
              priority
            />
          )}

          {video?.url && <HeaderVideo src={videoURL} />}
        </MediaWrapper>
      )}

      <Section
        template={[{ width: '1/1' }]}
        marginTop={SpacingValue.none}
        marginBottom={SpacingValue.none}
        paddingTop={SpacingValue.none}
        paddingBottom={SpacingValue.none}
        gridOptions={{ left: GridOptionValue.normal, right: GridOptionValue.normal }}
      >
        <Column>
          <TextWrapper>
            {props.includeAttribution ? (
              <Caption>
                {localize(Localization.photoAttribution)}: {[media?.attribution ?? '']}
              </Caption>
            ) : null}
            {sourceText && haveMedia && <Caption>{sourceText}</Caption>}

            <Heading haveMedia={!!haveMedia}>{heading}</Heading>
          </TextWrapper>
        </Column>
      </Section>
    </>
  );
};

export default PageHeader;
