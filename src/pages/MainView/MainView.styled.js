import styled from "styled-components";

export const BackBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin: 10px;
  font-size: 16px;
  color: #ffffff;
  background-color: #944038;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover,
  &:focus {
    background-color: #a74d4d;
  }
  &:active {
    background-color: #752c2c;
  }

  @media screen and (min-width: 768px) {
    position: sticky;
    top: 10px;
    z-index: 10;
  }
`;

export const CardContainer = styled.div`
  @media screen and (min-width: 768px) {
    flex: 1;
    overflow-y: auto;
  }
`;

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 20px;
  padding: 10px;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
    align-items: start;
  }
`;
