import styled from 'styled-components';
import Section from '../section/section';
import { GridOptionValue, RenderedSectionProps } from '../section/types';
import { SpacingValue } from '../../styles/goboat-exclusive-theme';
import Image, { ImageProps } from '../image/image';
import { ImageLayout } from '../image/image';

// 1 images -> 1 / span 12
// 2 images -> 1 / span 6 - 6 / span 6
// 3 images -> 1 / span 4 - 4 / span 4 - 8 / span 4
// 4 images -> 1 / span 3 - 3 / span 3 - 6 / span 3 - 9 / span 3

// 5 images -> 1 / span 4 - 4 / span 4 - 8 / span 4 - 1 / span 6 - 6 / span 6
// 6 images -> 1 / span 4 - 4 / span 4 - 8 / span 4 - 1 / span 4 - 4 / span 4 - 8 / span 4
// 7 images -> 1 / span 3 - 3 / span 3 - 6 / span 3 - 9 / span 3 - 1 / span 4 - 4 / span 4 - 8 / span 4
// 8 images -> 1 / span 3 - 3 / span 3 - 6 / span 3 - 9 / span 3 - 1 / span 3 - 3 / span 3 - 6 / span 3 - 9 / span 3

// 1 - 4 images
// startCol = if index = 0 then 1 else 12 / {{nr. of images}} * {{index}}
// colSpan = 12 / {{nr. of images}}

// 5 - 8 images
// images in first row = Math.ceil({{nr. of image / 2}})
// take nr. of images in first row and style them like if there was only one row
// take the remaining nr. of images and styled them like if there was only one row

const NUMBER_OF_COLUMNS = 12;
const MAX_IMAGES_PER_COLUMN = 4;

const getImagePlacement = (nrOfImages: number, imageIndex: number) => {
  if (nrOfImages <= 4) {
    const startCol =
      imageIndex === 0 ? 1 : (NUMBER_OF_COLUMNS / nrOfImages) * imageIndex + 1;
    const colSpan = NUMBER_OF_COLUMNS / nrOfImages;

    return `grid-column: ${startCol} / span ${colSpan};`;
  }

  if (nrOfImages <= 8) {
    const imagesInFirstRow = Math.ceil(nrOfImages / 2);
    const remainingImages = nrOfImages - imagesInFirstRow;

    if (imageIndex <= imagesInFirstRow - 1) {
      const startCol =
        imageIndex === 0 ? 1 : (NUMBER_OF_COLUMNS / imagesInFirstRow) * imageIndex + 1;
      const colSpan = NUMBER_OF_COLUMNS / imagesInFirstRow;

      return `grid-column: ${startCol} / span ${colSpan};`;
    }

    if (imageIndex > imagesInFirstRow - 1) {
      const startCol =
        imageIndex === imagesInFirstRow
          ? 1
          : (NUMBER_OF_COLUMNS / remainingImages) * (imageIndex - imagesInFirstRow) + 1;
      const colSpan = NUMBER_OF_COLUMNS / remainingImages;

      return `grid-column:${startCol} / span ${colSpan};`;
    }
  }

  // 4 images pr. row
  const startCol =
    imageIndex === 0 ? 1 : (NUMBER_OF_COLUMNS / MAX_IMAGES_PER_COLUMN) * imageIndex;
  const colSpan = NUMBER_OF_COLUMNS / MAX_IMAGES_PER_COLUMN;

  return `grid-column: ${startCol} / span ${colSpan};`;
};

const getImagePlacementMobile = (nrOfImages: number, imageIndex: number) => {
  if (nrOfImages <= 2) {
    const startCol =
      imageIndex === 0 ? 1 : (NUMBER_OF_COLUMNS / nrOfImages) * imageIndex + 1;
    const colSpan = NUMBER_OF_COLUMNS / nrOfImages;

    // If one image in first row
    if (nrOfImages === 1 && imageIndex === 0) {
      return `grid-column:${startCol} / span ${colSpan};
        aspect-ratio: 2/1;`;
    }

    return `grid-column: ${startCol} / span ${colSpan};`;
  }

  // More than 2 images
  const imagesInFirstRow = 2;
  const remainingImages = Math.min(nrOfImages - imagesInFirstRow, 2);

  // First row
  if (imageIndex <= imagesInFirstRow - 1) {
    const startCol =
      imageIndex === 0 ? 1 : (NUMBER_OF_COLUMNS / imagesInFirstRow) * imageIndex + 1;
    const colSpan = NUMBER_OF_COLUMNS / imagesInFirstRow;

    return `grid-column: ${startCol} / span ${colSpan};`;
  }

  // Second row
  if (imageIndex <= imagesInFirstRow + remainingImages - 1) {
    const startCol =
      imageIndex === imagesInFirstRow
        ? 1
        : (NUMBER_OF_COLUMNS / remainingImages) * (imageIndex - imagesInFirstRow) + 1;
    const colSpan = NUMBER_OF_COLUMNS / remainingImages;

    // If one image in second row
    if (remainingImages === 1 && imageIndex === 2) {
      return `grid-column:${startCol} / span ${colSpan};
        aspect-ratio: 2/1;`;
    }

    return `grid-column:${startCol} / span ${colSpan};`;
  }

  // Hide rest of the images
  return `display: none;`;
};

const ImageGridWrapper = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: ${`repeat(${NUMBER_OF_COLUMNS}, 1fr)`};
  z-index: 2;
`;

const ImageGridItem = styled(Image)<{ placement: string; placementMobile: string }>`
  position: relative;
  object-fit: cover;
  aspect-ratio: 1/1;
  justify-self: stretch;
  ${(props) => props.placementMobile};

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    display: block;
    aspect-ratio: 1/1;
    max-height: 440px;
    ${(props) => props.placement};
  }
`;

interface ImageGridProps {
  images: ImageProps[];
}

const ImageGrid = (props: ImageGridProps) => {
  const { images } = props;

  const sectionProps: RenderedSectionProps = {
    template: [{ width: '1/1' }],
    marginTop: SpacingValue.medium,
    marginBottom: SpacingValue.medium,
    paddingTop: SpacingValue.none,
    paddingBottom: SpacingValue.none,
    gridOptions: {
      left: GridOptionValue.extended,
      right: GridOptionValue.extended,
    },
  };

  return (
    <Section {...sectionProps}>
      <ImageGridWrapper>
        {images.map((image, index) => (
          <ImageGridItem
            key={image.image.url + index}
            image={{ url: image.image.url, blurDataURL: image.image.blurDataURL }}
            layout={ImageLayout.fill}
            objectFit="cover"
            placement={getImagePlacement(images.length, index)}
            placementMobile={getImagePlacementMobile(images.length, index)}
          />
        ))}
      </ImageGridWrapper>
    </Section>
  );
};

export default ImageGrid;
