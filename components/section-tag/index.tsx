import styled from 'styled-components';
import { SpacingValue } from '../../styles/goboat-exclusive-theme';

interface StyledSectionProps {
  text: string;
  align: 'left' | 'center' | 'right';
  marginTop: SpacingValue;
  marginBottom: SpacingValue;
}

const StyledSectionTag = styled.p<StyledSectionProps>`
  border: 1px solid ${(props) => props.theme.colorSectionTagBorder};
  border-radius: 100px;
  padding: 8px 20px;
  font-size: 14px;
  width: fit-content;
  color: ${(props) => props.theme.colorTextPrimary};

  margin-top: ${(props) => props.theme.spacing[props.marginTop]}px;
  margin-bottom: ${(props) => props.theme.spacing[props.marginBottom]}px;

  margin-left: ${(props) =>
    props.align === 'center' || props.align === 'right' ? 'auto' : 0};
  margin-right: ${(props) =>
    props.align === 'center' || props.align === 'left' ? 'auto' : 0};
`;

const SectionTag = (props: any) => {
  const { text, ...rest } = props;

  return <StyledSectionTag {...rest}>{text}</StyledSectionTag>;
};

export default SectionTag;
