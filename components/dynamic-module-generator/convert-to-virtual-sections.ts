import { ContentBlock } from '.';
import { SpacingValue } from '../../styles/Theme';
import { GridOptionValue, ContentSection } from '../section/types';

// Create a basic skeleton for a single row column
const getVirtualSection = (width: string): ContentSection => {
  return {
    blockName: 'next24hr/section',
    marginTop: SpacingValue.medium,
    marginBottom: SpacingValue.medium,
    paddingTop: SpacingValue.none,
    paddingBottom: SpacingValue.none,
    ['template']: [
      {
        width,
      },
    ],
    blocks: [
      {
        blockName: 'next24hr/column',
        blocks: [],
      },
    ],
    gridOptions: {
      left: GridOptionValue.normal,
      right: GridOptionValue.normal,
    },
  };
};

const excludedBlocks = [
  'next24hr/section',
  'goboat/goboat-spirit',
  'goboat/featured-content',
  'goboat/how-it-works-hero',
  'goboat/location-map',
  'goboat/locations',
  'goboat/events',
  'goboat/page-header',
  'goboat/hero-section',
  'yoast/faq-block',
  'goboat/faq-collection',
  'goboat/carousel',
  'goboat/full-width-image',
  'goboat/image-grid',
];

// First version (1.0.0) of a wordpress blocks content converter to our classic row/column
// structure.
// This function makes sure that any none-columns blocks are wrapped in a row/column.
const convertToVirtualSections = (
  content: ContentBlock[],
  skipSectionConversion: boolean = false
) => {
  if (!content) {
    return content;
  }

  let parsedContent = [];

  let current = getVirtualSection('1/1');

  // Iterate through all top level blocks and save all blocks that
  // arent in core/columns or core/blocks in an array
  // until we encounter a core/columns, core/blocks or we hit the end.
  // When we do that, we push the array into the content array.
  // If we encounter a core/columns, we just add it.
  // The same for core/block, but we make sure that their inner content is
  // also wrapped in a row/columns with the same rules as above.
  for (let i = 0, ii = content.length; i < ii; i++) {
    let block = content[i];

    if (excludedBlocks.includes(block.blockName) || skipSectionConversion) {
      if ((current.blocks?.[0].blocks.length ?? 0) > 0) {
        parsedContent.push(current);
        current = getVirtualSection('1/1');
      }
      parsedContent.push(block);
    } else {
      current.blocks?.[0].blocks.push(block);
      parsedContent.push(current);
      current = getVirtualSection('1/1');
    }
  }

  if ((current.blocks?.length ?? 0) > 0 && (current.blocks?.[0].blocks.length ?? 0) > 0) {
    parsedContent.push(current);
  }

  return parsedContent;
};

export default convertToVirtualSections;
