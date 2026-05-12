import React, { useState } from "react";
import { Link as LinkR } from "react-router-dom";
import styled from "styled-components";
import { Bio } from "../data/constants";
import { MenuRounded } from "@mui/icons-material";

const Nav = styled.div`
  background-color: ${({ theme }) => theme.bg};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 1000;
  color: white;
  overflow: visible;
`;

const NavbarContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
  overflow: visible;
`;

const NavLogo = styled(LinkR)`
  width: auto;
  padding: 0 6px;
  font-weight: 600;
  font-size: 18px;
  text-decoration: none;
  color: inherit;
  white-space: nowrap;
`;

const NavItems = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 28px; /* Reduced gap to fit all items */
  padding: 0 10px;
  list-style: none;

  @media screen and (max-width: 1024px) {
    gap: 10px; /* Even smaller gap for smaller screens */
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  font-size: 0.95rem;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  padding: 0 6px;
  flex-wrap: nowrap; /* Forces buttons to stay on one line */
  overflow: visible;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const GithubButton = styled.a`
  border: 1px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  justify-content: center;
  display: flex;
  align-items: center;
  border-radius: 20px;
  cursor: pointer;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.6s ease-in-out;
  text-decoration: none;
  white-space: nowrap;
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text_primary};
  }
`;

const MobileIcon = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.text_primary};
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 16px;
  padding: 12px 40px 24px 40px;
  background: ${({ theme }) => theme.card_light + 99};
  position: absolute;
  top: 80px;
  right: 0;
  transition: all 0.6s ease-in-out;
  transform: ${({ isOpen }) => (isOpen ? "translateY(0)" : "translateY(-100%)")};
  border-radius: 0 0 20px 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
  z-index: ${({ isOpen }) => (isOpen ? "1000" : "-1000")};
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Nav>
      <NavbarContainer>
        <NavLogo to="/">Mahalaxmi K</NavLogo>

        <MobileIcon onClick={() => setIsOpen(!isOpen)}>
          <MenuRounded style={{ color: "inherit" }} />
        </MobileIcon>

        <NavItems>
  <NavLink href="#About">About</NavLink>
  <NavLink href="#Skills">Skills</NavLink>
  <NavLink href="#Projects">Projects</NavLink>
  <NavLink href="#Education">Education</NavLink>
  <NavLink href="#certifications">Certifications</NavLink>
  <NavLink href="#achievements">Achievements</NavLink>
  <NavLink href="#Experience">Experience</NavLink>
</NavItems>


        <ButtonContainer>
          <GithubButton href={Bio.github} target="_Blank" rel="noopener noreferrer">
            GitHub
          </GithubButton>
        </ButtonContainer>

        {isOpen && (
          <MobileMenu isOpen={isOpen}>
            <NavLink onClick={() => setIsOpen(!isOpen)} href="#About">About</NavLink>
            <NavLink onClick={() => setIsOpen(!isOpen)} href="#Skills">Skills</NavLink>
            <NavLink onClick={() => setIsOpen(!isOpen)} href="#certifications">Certifications</NavLink>
            <NavLink onClick={() => setIsOpen(!isOpen)} href="#Experience">Experience</NavLink>
            <NavLink onClick={() => setIsOpen(!isOpen)} href="#achievements">Achievements</NavLink>
            <NavLink onClick={() => setIsOpen(!isOpen)} href="#Projects">Projects</NavLink>
            <NavLink onClick={() => setIsOpen(!isOpen)} href="#Education">Education</NavLink>
            <div style={{ display: "flex", gap: "10px", width: "100%", marginTop: "10px" }}>
              <GithubButton href={Bio.github} target="_Blank" rel="noopener noreferrer">GitHub</GithubButton>
            </div>
          </MobileMenu>
        )}
      </NavbarContainer>
    </Nav>
  );
};

export default Navbar;