import React from 'react';
import styled from 'styled-components';

import { SpacingValue } from '../styles/Theme';
import { SmallText, TextColor } from '../sub-components/Text';

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 64px;

  @media (min-width: ${(props) => props.theme.breakpoints.desktop}px) {
    margin-bottom: 128px;
  }
`;

export const StyledTag = styled.div<{ selected?: boolean; disabled?: boolean }>`
  padding: 4px 8px;
  background-color: ${(props) =>
    props.selected ? props.theme.colors.dark : props.theme.colors.grey};
  margin: 0 8px 8px 0;
  min-height: 30px;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;
  cursor: pointer;
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
`;

const Checkmark = styled.span<{ selected: boolean }>`
  display: inline-block;
  position: absolute;
  left: -20px;
  width: 22px;
  height: 22px;
  -ms-transform: rotate(45deg); /* IE 9 */
  -webkit-transform: rotate(45deg); /* Chrome, Safari, Opera */
  transform: rotate(45deg);
  transition: opacity 0.2s;
  opacity: ${(props) => (props.selected ? '1' : '0')};

  &:before {
    content: '';
    position: absolute;
    width: 3px;
    height: 15px;
    background-color: ${(props) => props.theme.white};
    left: 4px;
    top: 8px;
    border-radius: 3px;
  }

  &:after {
    content: '';
    position: absolute;
    width: 9px;
    height: 3px;
    background-color: ${(props) => props.theme.white};
    left: -2px;
    top: 21px;
    border-radius: 3px;
  }
`;

interface SelectedTagsProps {
  tags: {
    slug: string;
    name: string;
  }[];
  selectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
  className?: string;
  mode?: 'single' | 'multiple';
  disabled?: boolean;
}

const SelectedTags = (props: SelectedTagsProps) => {
  const { tags, setSelectedTags, selectedTags, className } = props;

  return (
    <TagsContainer className={className}>
      {tags.map((tag) => {
        const selected = selectedTags.includes(tag.slug);

        const tagProps = {
          selected,
          onClick: () => {
            if (props.disabled) return;
            selected
              ? props.mode === 'single'
                ? setSelectedTags([])
                : setSelectedTags(selectedTags.filter((slug) => tag.slug !== slug))
              : props.mode === 'single'
              ? setSelectedTags([tag.slug])
              : setSelectedTags([...selectedTags, tag.slug]);
          },
          disabled: props.disabled,
        };

        return (
          <StyledTag key={tag.slug} {...tagProps}>
            <SmallText
              margin={SpacingValue.none}
              color={selected ? TextColor.white : undefined}
              style={{
                marginLeft: selected ? '28px' : '0',
                transition: 'all 0.2s',
                position: 'relative',
              }}
            >
              <Checkmark selected={selected} />
              {String(tag.name).replace(/^./, (character) => character.toUpperCase())}
            </SmallText>
          </StyledTag>
        );
      })}
    </TagsContainer>
  );
};

export default SelectedTags;
