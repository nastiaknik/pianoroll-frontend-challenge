import styled from "styled-components";

export const MainCard = styled.div`
  width: 90vw;
  border: 1px solid #ccc;
  padding: 10px;
  margin: 0 auto;
  cursor: pointer;

  @media screen and (min-width: 768px) {
    position: sticky;
    top: 66px;
    left: 0;
    width: 70vw;
  }
`;
