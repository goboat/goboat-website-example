import styled from 'styled-components';

export const FilterWrapper = styled.div`
  display: flex;
  border: 1px solid ${(props) => props.theme.colorTextPrimary};
  border-radius: 20px;
  max-width: fit-content;

  > div {
    padding: 8px 0;
  }
`;

export const Input = styled.input`
  display: none;
  :checked + label {
    background: ${(props) => props.theme.colorTextPrimary};
    color: ${(props) => props.theme.white};
  }
  :disabled + label {
    opacity: 0.5;
  }
`;

export const Label = styled.label`
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 20px;
  transition: opacity 0.3s;
`;
