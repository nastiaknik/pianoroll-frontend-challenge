import styled from "styled-components";

export const Main = styled.main`
  font-family: "Mulish", sans-serif;
  height: 100vh;
  overflow: auto;
  background-color: #f0f0f0;
  color: #1c1c1a;
  text-align: center;
  position: relative;
  padding-top: 60px;
  cursor: default;
`;

export const NavBar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled.img`
  height: 40px;
  width: auto;
  fill: white;
`;

export const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  padding: 10px;
  background-color: #154151;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;
