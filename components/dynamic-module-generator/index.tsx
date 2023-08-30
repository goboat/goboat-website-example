import React from 'react';
import { gutenbergComponents } from '..';
import convertToVirtualSections from './convert-to-virtual-sections';
import { VisibilityOptions } from '../../lib/types';
import { ContentSection } from '../section/types';

const levelTypes = ['row', 'column', 'component', 'subcomponent'];

export interface ContentBlock {
  blocks: ContentBlock[];
  blockName: string;
  visibility?: VisibilityOptions;
  content?: any;
  children?: any;
  hash?: string;
}

export type Content = {
  blocks: ContentBlock[];
};

export type DynamicModuleGeneratorProps = {
  content: Content;
  permalink?: string;
  onParsed?: (
    content: (ContentBlock | ContentSection)[]
  ) => (ContentBlock | ContentSection)[];
  pageTitle?: string;
  skipSectionConversion?: boolean;
};

type OuterProps = {
  numberOfChildren?: number;
};

function assertBlockName(
  blockName: string
): blockName is keyof typeof gutenbergComponents {
  return blockName in gutenbergComponents;
}

class DynamicModuleGenerator extends React.Component<DynamicModuleGeneratorProps> {
  convertAttsToProps(Module: any, attributes: any, parentProps: any) {
    if (Module && typeof Module.parseProps === 'function') {
      return Module.parseProps(Object.assign({}, parentProps, attributes));
    }
    return attributes;
  }

  renderComponent(
    components: (ContentBlock | ContentSection)[],
    parentProps: Partial<DynamicModuleGeneratorProps> = {},
    level = 1,
    indexes = {}
  ): (ReturnType<typeof React.createElement> | null)[] | null {
    if (!components) {
      return null;
    }
    const { permalink } = this.props;

    return components.map((componentData, index) => {
      const blockName = componentData.blockName ?? 'NO BLOCK NAME';

      if (!assertBlockName(blockName)) {
        if ((process as any).name === 'browser') {
          console.error(
            'Could not match Gutenberg module of type "%s"',
            componentData.blockName
          ); // eslint-disable-line no-console
        }
        return (
          <div
            className="dynamic-module-generator--error"
            key={componentData.hash || index}
          >
            Could not find a matching component for{' '}
            <span className="dynamic-module-generator--error-label">
              {componentData.blockName}
            </span>
          </div>
        );
      }

      const Module = gutenbergComponents[blockName];

      const outerProps: OuterProps = {};

      if (componentData.blocks && componentData.blocks.length > 0) {
        outerProps.numberOfChildren = componentData.blocks.length;
      }

      const attributes: any = { ...componentData };

      delete attributes.blocks; // We dont want to pass the array of children, that goes as prop called children
      const passProps = Object.assign(attributes || {}, outerProps);

      // Combine all the props based on what the current module wants
      const combinedPassProps = this.convertAttsToProps(Module, passProps, parentProps);

      // If there are some props we want to pass down to every child, we do it here
      combinedPassProps.permalink = parentProps.permalink || permalink;
      combinedPassProps.moduleName = componentData.blockName;
      combinedPassProps.pageTitle = parentProps.pageTitle;

      let children =
        componentData.blocks && componentData.blocks.length > 0
          ? this.renderComponent(
              componentData.blocks,
              combinedPassProps,
              undefined,
              undefined
            )
          : null;

      if (children === null && componentData.content) {
        children = componentData.content;
      }

      // Headings, paragraphs etc. get there content from a `children` prop
      if (children === null && componentData.children) {
        children = componentData.children;
      }

      const type = levelTypes[level - 1];
      const newIndexes = {
        ...indexes,
        [type]: index,
      };

      return React.createElement(
        Module,
        {
          key: componentData.hash || index,
          indexes: newIndexes,
          last: index === components.length - 1,
          ...combinedPassProps,
        },
        children
      );
    });
  }

  render() {
    let { onParsed, content, pageTitle, skipSectionConversion } = this.props;
    let withSections = convertToVirtualSections(content.blocks, skipSectionConversion);

    // This lets us modified the data before its rendered
    if (onParsed) {
      withSections = onParsed(withSections);
    }

    return (
      <div tabIndex={0} style={{ width: '100%', outline: 'none' }}>
        {this.renderComponent(withSections, { pageTitle }, undefined, undefined)}
      </div>
    );
  }
}

export default DynamicModuleGenerator;
