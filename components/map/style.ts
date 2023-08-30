import styled from 'styled-components';

export const NoMapContainer = styled.div`
  width: 100%;
  height: 100%;
  aspect-ratio: 16/9;
  background-color: ${(props) => props.theme.colorInactive};
  display: flex;
  justify-content: center;
  align-items: center;
`;
