import { CSSProperties } from 'react';
import styled from 'styled-components';
import { fontBodyRegular } from '../styles/fonts';

interface DownArrowProps {
  style?: object;
  width?: number;
  height?: number;
}

const DEFAULFT_ARROW_WIDTH = 18;
const DEFAULFT_ARROW_HEIGHT = 10;

const DownArrow = ({ style, width, height }: DownArrowProps) => {
  const styles: CSSProperties = {
    marginLeft: `-${width ?? DEFAULFT_ARROW_WIDTH}px`,
    pointerEvents: 'none',
    ...style,
  };

  return (
    <svg
      style={styles}
      width={width ?? DEFAULFT_ARROW_WIDTH}
      height={height ?? DEFAULFT_ARROW_HEIGHT}
      viewBox="0 0 18 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.8117 1.17808C16.6886 1.06391 16.5234 1 16.3513 1C16.1792 1 16.014 1.06391 15.8909 1.17808L9 7.55635L2.11047 1.17808C1.98738 1.06391 1.82213 0.999999 1.65007 0.999999C1.478 0.999999 1.31275 1.06391 1.18966 1.17808C1.12964 1.23357 1.08193 1.29992 1.04936 1.37321C1.01678 1.44649 1 1.52523 1 1.60478C1 1.68433 1.01678 1.76307 1.04936 1.83635C1.08193 1.90964 1.12964 1.97599 1.18966 2.03148L8.51892 8.8142C8.64763 8.93333 8.82026 9 9 9C9.17974 9 9.35237 8.93333 9.48108 8.8142L16.8103 2.03148C16.8704 1.97599 16.9181 1.90964 16.9506 1.83636C16.9832 1.76307 17 1.68433 17 1.60478C17 1.52523 16.9832 1.44649 16.9506 1.37321C16.9181 1.29992 16.8308 1.19865 16.7708 1.14315L16.8117 1.17808Z"
        fill="#333233"
        stroke="#333233"
        strokeWidth="0.5"
      />
    </svg>
  );
};

const StyledSelect = styled.select<{ arrowWidth?: number }>`
  ${fontBodyRegular}
  font-size: ${(props) => props.theme.fontSizes.mobile.smallText};

  background-color: transparent;
  border: none;
  color: ${(props) => props.theme.colorTextPrimary};
  outline: none;
  width: fit-content;
  cursor: pointer;
  appearance: none;

  /* Push the arrow to the side with padding so the arrow is clickable */
  padding-right: ${(props) =>
    props.arrowWidth
      ? `calc(8px + ${props.arrowWidth}px)`
      : `calc(8px + ${DEFAULFT_ARROW_WIDTH}px)`};

  @media only screen and (min-width: ${(props) => props.theme.breakpoints.tablet}px) {
    font-size: ${(props) => props.theme.fontSizes.desktop.smallText};

    /* Push the arrow to the side with padding so the arrow is clickable */
    padding-right: ${(props) =>
      props.arrowWidth
        ? `calc(16px + ${props.arrowWidth}px)`
        : `calc(16px + ${DEFAULFT_ARROW_WIDTH}px)`};
  }
`;

interface SelectProps {
  children: any;
  onChange: (e: any) => void;
  name: string;
  value: string | number;
  arrowWidth?: number;
  arrowHeight?: number;
}

const Select = (props: SelectProps) => {
  const { children, onChange, name, value, arrowWidth, arrowHeight } = props;

  return (
    <div>
      <StyledSelect name={name} value={value} onChange={onChange} arrowWidth={arrowWidth}>
        {children}
      </StyledSelect>
      <DownArrow width={arrowWidth} height={arrowHeight} />
    </div>
  );
};

export default Select;
