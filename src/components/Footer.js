import React from 'react';
import styled from 'styled-components';
import GitHubIcon from '@mui/icons-material/GitHub';

const Nav = styled.div`
  background: transparent;
  z-index: 1000;
  position: fixed;
  width: 100%;
  bottom: 25px;
`;

const NavFooter = styled.div`
  margin: 0 auto;
  padding: 8px 8px 8px 13px;
  display: flex;
  align-items: center;
  pointer-events: none;
  color: #7787a5;
  font-size: 1.3rem;
  font-weight: 600;
`;

const NavLeft = styled.div`
  width: 80%;
  text-align: left;
`;

const NavRight = styled.div`
  width: 20%;
  text-align: right;
  pointer-events: all;
  margin-top: 8px;
  margin-right: 3%;
`;

const MenuLink = styled.a`
  color: #7787a5;
`;

const Footer = () => {
  return (
    <Nav>
      <NavFooter>
        <NavLeft>Coronavirus Monitor</NavLeft>
        <NavRight>
          <MenuLink
            href="https://github.com/baokhoavu/baocovidmap"
            target="_blank"
            rel="noopener noreferrer"
            title="Github">
            <GitHubIcon />
          </MenuLink>
        </NavRight>
      </NavFooter>
    </Nav>
  );
};

export default Footer;
