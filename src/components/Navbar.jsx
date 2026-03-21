import React, { useState, useEffect } from "react";
import { Link as LinkR } from "react-router-dom";
import styled, { useTheme } from "styled-components";
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

// LEETCODE STYLED COMPONENTS
const LeetcodeWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  overflow: visible;
`;

const LeetcodeButton = styled.a`
  border: 1px solid #ffa116;
  color: #ffa116;
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
    background: #ffa116;
    color: white;
  }
`;

const StatsCard = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  width: 200px;
  background: ${({ theme }) => theme.card_light};
  border: 1px solid #ffa116;
  border-radius: 12px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.5);
  z-index: 100;
  pointer-events: ${({ $visible }) => ($visible ? "auto" : "none")};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: ${({ $visible }) => ($visible ? "translateY(0)" : "translateY(10px)")};
  transition: all 0.3s ease;

  ${LeetcodeWrapper}:hover &,
  ${LeetcodeWrapper}:focus-within & {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }
`;

const StatItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: ${({ theme }) => theme.text_primary};
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
  const [leetcodeData, setLeetcodeData] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState("");
  const [showLeetcodeStats, setShowLeetcodeStats] = useState(false);
  const theme = useTheme();

  // IMPORTANT: Replace with your actual case-sensitive LeetCode username
  const leetcodeUsername = "Maha_0604"; 

  useEffect(() => {
    const normalizeStats = (data) => {
      if (!data || typeof data !== "object") return null;

      const totalSolved = Number(data.totalSolved ?? data.total_solved ?? 0);
      const easySolved = Number(data.easySolved ?? data.easy_solved ?? 0);
      const mediumSolved = Number(data.mediumSolved ?? data.medium_solved ?? 0);
      const hardSolved = Number(data.hardSolved ?? data.hard_solved ?? 0);
      const ranking = Number(data.ranking ?? data.rank ?? 0);

      if (!Number.isFinite(totalSolved) || totalSolved < 0) return null;

      return {
        totalSolved,
        easySolved,
        mediumSolved,
        hardSolved,
        ranking: Number.isFinite(ranking) && ranking > 0 ? ranking : null,
      };
    };

    const fetchLeetcodeStats = async () => {
      setStatsLoading(true);
      setStatsError("");

      const endpoints = [
        `https://leetcode-stats-api.vercel.app/${leetcodeUsername}`,
        `https://alfa-leetcode-api.onrender.com/${leetcodeUsername}`,
      ];

      for (const endpoint of endpoints) {
        try {
          const response = await fetch(endpoint);
          if (!response.ok) continue;
          const data = await response.json();
          const normalized = normalizeStats(data);

          if (normalized) {
            setLeetcodeData(normalized);
            setStatsLoading(false);
            return;
          }
        } catch (error) {
          // Try the next API endpoint silently.
        }
      }

      setStatsError("Unable to fetch live stats right now.");
      setStatsLoading(false);
    };

    fetchLeetcodeStats();
    const intervalId = setInterval(fetchLeetcodeStats, 60000);

    return () => clearInterval(intervalId);
  }, [leetcodeUsername]);

  return (
    <Nav>
      <NavbarContainer>
        <NavLogo to="/">MyPortfolio</NavLogo>

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
          <LeetcodeWrapper
            onMouseEnter={() => setShowLeetcodeStats(true)}
            onMouseLeave={() => setShowLeetcodeStats(false)}
          >
            <LeetcodeButton
              href={`https://leetcode.com/${leetcodeUsername}`}
              target="_Blank"
              rel="noopener noreferrer"
              onFocus={() => setShowLeetcodeStats(true)}
              onBlur={() => setShowLeetcodeStats(false)}
            >
              LeetCode Profile
            </LeetcodeButton>
            <StatsCard $visible={showLeetcodeStats}>
              <h4 style={{ margin: "0 0 4px 0", color: "#ffa116", fontSize: "14px" }}>LeetCode Stats</h4>
              {statsLoading ? (
                <div style={{ color: theme.text_secondary, fontSize: "12px" }}>Loading live stats...</div>
              ) : (
                <>
                  <StatItem><span>Solved:</span><span>{leetcodeData?.totalSolved ?? "0"}</span></StatItem>
                  <StatItem><span>Rank:</span><span>{leetcodeData?.ranking?.toLocaleString() || "N/A"}</span></StatItem>
                  <StatItem><span style={{ color: "#00b8a3" }}>Easy:</span><span>{leetcodeData?.easySolved ?? 0}</span></StatItem>
                  <StatItem><span style={{ color: "#ffc01e" }}>Med:</span><span>{leetcodeData?.mediumSolved ?? 0}</span></StatItem>
                  <StatItem><span style={{ color: "#ef4743" }}>Hard:</span><span>{leetcodeData?.hardSolved ?? 0}</span></StatItem>
                  {statsError && (
                    <div style={{ color: "#ff6b6b", fontSize: "11px", marginTop: "4px" }}>{statsError}</div>
                  )}
                </>
              )}
            </StatsCard>
          </LeetcodeWrapper>

          <GithubButton href={Bio.github} target="_Blank">
            Github Profile
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
              <LeetcodeButton href={`https://leetcode.com/${leetcodeUsername}`} target="_Blank">LeetCode</LeetcodeButton>
              <GithubButton href={Bio.github} target="_Blank">GitHub</GithubButton>
            </div>
          </MobileMenu>
        )}
      </NavbarContainer>
    </Nav>
  );
};

export default Navbar;