import styled from "styled-components";

export const CardGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 10px;
  max-width: 1420px;
  padding: 15px;
  margin: 0 auto;
  list-style: none;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const CardList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  list-style: none;
  overflow-y: auto;
`;
