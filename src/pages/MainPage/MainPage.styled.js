import styled from "styled-components";

export const Title = styled.h1`
  font-size: 42px;
  margin: 20px 0;
`;

export const Button = styled.button`
  position: relative;
  padding: 15px 25px;
  margin: 0 auto;
  font-size: 18px;
  color: #f0f0f0;
  background-color: #944038;
  border: none;
  border-radius: 5px;
  border-bottom: 3px solid #381815;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover,
  &:focus {
    background-color: #a74d4d;
  }
  &:active {
    background-color: #752c2c;
  }
`;
