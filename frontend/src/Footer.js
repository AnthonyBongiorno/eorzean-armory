import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterLink href="https://github.com/AnthonyBongiorno/eorzean-armory" target="_blank" rel="noopener noreferrer">
        Github Repo
      </FooterLink>
      <FooterLink href="https://github.com/AnthonyBongiorno/eorzean-armory" target="_blank" rel="noopener noreferrer">
        Github
      </FooterLink>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  position: fixed;
  
  bottom: 0;
  width: 100%;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: #1d2324;
  color: white;
  border-top: black solid 1px;
`;

const FooterLink = styled.a`
  text-decoration: none;
  color: white;
  margin: 0 20px 0;
  padding: 0 10px 0;
  &:hover {
    color: var(--teal);
  }
`;

export default Footer;