import {
  DefaultTheme,
  FlattenInterpolation,
  FlattenSimpleInterpolation,
  ThemeProps,
  css,
} from 'styled-components';
import {
  AutopopulateError,
  Entry,
  EntryContent,
  EntryWithPossibleError,
  FeaturedContentBackgroundType,
  FeaturedContentBackgroundValue,
  FeaturedContentTextColor,
} from './types';

export function assertNoAutopopulateError<T>(arg: T | AutopopulateError): arg is T {
  return !('__error' in arg);
}

export function assertEntryHasNoError(entry: EntryWithPossibleError): entry is Entry {
  return assertNoAutopopulateError<EntryContent>(entry.content);
}

/**
 *  Helper function to generate background css for sections
 * @param backgroundType "transparent", "color", or "image"
 * @param backgroundValue if backgroundType is color then "light" or "dark",
 * if backgroundType is image then "{ url: string }"
 * @returns {string} css string
 */
export function getBackgroundStyle(
  backgroundType?: FeaturedContentBackgroundType,
  backgroundValue?: FeaturedContentBackgroundValue,
  theme?: DefaultTheme
): FlattenSimpleInterpolation | FlattenInterpolation<ThemeProps<any>> {
  if (!backgroundType || backgroundType === 'transparent') {
    return css``;
  } else if (backgroundType === 'color' && typeof backgroundValue === 'string') {
    return css`
      background-color: ${theme?.colors[backgroundValue]};
    `;
  }

  return css``;
}

interface GetFeaturedContentTextColorProps {
  backgroundType?: FeaturedContentBackgroundType;
  backgroundValue?: FeaturedContentBackgroundValue;
}

export const getFeaturedContentTextColor = (
  props: GetFeaturedContentTextColorProps
): FeaturedContentTextColor => {
  const { backgroundType, backgroundValue } = props;

  if (backgroundType === 'color' && backgroundValue === 'dark') return 'light';

  return 'dark';
};
