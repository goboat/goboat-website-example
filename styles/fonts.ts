import { css } from 'styled-components';

// This is some importable css that makes sure fonts is specified/downloaded consistantly

// Headings
export const fontHeadingLight = css`
  @supports (font-variation-settings: normal) {
    font-family: ${(props) => props.theme.fontHeadingVariable},
      ${(props) => props.theme.fontFallback};
  }

  @supports not (font-variation-settings: normal) {
    font-family: ${(props) => props.theme.fontHeadingRegular},
      ${(props) => props.theme.fontFallback};
  }

  font-weight: 300;
  font-style: normal;
`;

export const fontHeadingRegular = css`
  @supports (font-variation-settings: normal) {
    font-family: ${(props) => props.theme.fontHeadingVariable},
      ${(props) => props.theme.fontFallback};
  }

  @supports not (font-variation-settings: normal) {
    font-family: ${(props) => props.theme.fontHeadingRegular},
      ${(props) => props.theme.fontFallback};
  }

  font-weight: 400;
  font-style: normal;
`;

export const fontHeadingMedium = css`
  @supports (font-variation-settings: normal) {
    font-family: ${(props) => props.theme.fontHeadingVariable},
      ${(props) => props.theme.fontFallback};
  }

  @supports not (font-variation-settings: normal) {
    font-family: ${(props) => props.theme.fontHeadingMedium},
      ${(props) => props.theme.fontFallback};
  }

  font-weight: 500;
  font-style: normal;
`;

export const fontHeadingSemiBold = css`
  @supports (font-variation-settings: normal) {
    font-family: ${(props) => props.theme.fontHeadingVariable},
      ${(props) => props.theme.fontFallback};
  }

  @supports not (font-variation-settings: normal) {
    font-family: ${(props) => props.theme.fontHeadingSemiBold},
      ${(props) => props.theme.fontFallback};
  }

  font-weight: 600;
  font-style: normal;
`;

// Body text
export const fontBodyRegular = css`
  @supports (font-variation-settings: normal) {
    font-family: ${(props) => props.theme.fontBodyVariable},
      ${(props) => props.theme.fontFallback};
  }

  @supports not (font-variation-settings: normal) {
    font-family: ${(props) => props.theme.fontBodyRegular},
      ${(props) => props.theme.fontFallback};
  }

  font-weight: 400;
  font-style: normal;
`;

export const fontBodyMedium = css`
  @supports (font-variation-settings: normal) {
    font-family: ${(props) => props.theme.fontBodyVariable},
      ${(props) => props.theme.fontFallback};
  }

  @supports not (font-variation-settings: normal) {
    font-family: ${(props) => props.theme.fontBodyMedium},
      ${(props) => props.theme.fontFallback};
  }

  font-weight: 500;
  font-style: normal;
`;

export const fontBodySemiBold = css`
  @supports (font-variation-settings: normal) {
    font-family: ${(props) => props.theme.fontBodyVariable},
      ${(props) => props.theme.fontFallback};
  }

  @supports not (font-variation-settings: normal) {
    font-family: ${(props) => props.theme.fontBodySemiBold},
      ${(props) => props.theme.fontFallback};
  }

  font-weight: 600;
  font-style: normal;
`;
