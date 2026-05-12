import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { achievements } from "../../data/constants";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  position: relative;
  z-index: 1;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  gap: 20px;
`;

const Title = styled.h2`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 10px;
`;

const LeetcodeWidget = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 22px 24px;
  border-radius: 22px;
  background: transparent;
  border: 1px solid rgba(255, 161, 22, 0.85);
  box-shadow: 0px 10px 28px rgba(0, 0, 0, 0.18);
  backdrop-filter: blur(12px);
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const WidgetHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
`;

const WidgetTitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const WidgetTitle = styled.h3`
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: #ffa116;
`;

const WidgetSubtitle = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
`;

const WidgetStatus = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #ffcf87;

  &::before {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ $active }) => ($active ? "#ffa116" : "#ff6b6b")};
    box-shadow: 0 0 0 4px ${({ $active }) => ($active ? "rgba(255,161,22,0.16)" : "rgba(255,107,107,0.18)")};
  }
`;

const WidgetGrid = styled.div`
  display: flex;
  align-items: stretch;
  gap: 12px;
  flex-wrap: nowrap;
  overflow-x: auto;

  &::-webkit-scrollbar {
    height: 0;
  }

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

const WidgetItem = styled.div`
  flex: 1 1 0;
  min-width: 120px;
  padding: 14px 10px;
  border-radius: 16px;
  background: transparent;
  border: 1px solid rgba(255, 161, 22, 0.22);
  text-align: center;
`;

const WidgetValue = styled.div`
  font-size: 22px;
  font-weight: 700;
  color: ${({ $tone }) => ($tone === "easy" ? "#00b8a3" : $tone === "hard" ? "#ef4743" : "#ffa116")};
`;

const WidgetLabel = styled.div`
  margin-top: 4px;
  font-size: 13px;
  color: #ffd8a3;
`;

const CarouselContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
  min-height: auto;
`;

const Card = styled(motion.div)`
  width: 100%;
  max-width: 800px;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.primary + "50"};
  border-radius: 24px;
  padding: 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  min-width: 300px;
`;

const Image = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 16px;
  border: 2px solid ${({ theme }) => theme.primary + "30"};
`;

const Content = styled.div`
  flex: 1.2;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const AchievementTitle = styled.h3`
  font-size: 28px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
`;

const ResultBadge = styled.span`
  width: fit-content;
  font-size: 14px;
  background: ${({ theme }) => theme.primary + "20"};
  color: ${({ theme }) => theme.primary};
  padding: 4px 14px;
  border-radius: 30px;
  border: 1px solid ${({ theme }) => theme.primary};
  font-weight: 600;
`;

const DateText = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
`;

const Description = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.6;
`;

const NavButton = styled.button`
  background: ${({ theme }) => theme.card_light};
  color: ${({ theme }) => theme.text_primary};
  border: 1px solid ${({ theme }) => theme.primary + "80"};
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.primary};
    box-shadow: 0 0 15px ${({ theme }) => theme.primary};
  }

  &.left { left: -30px; }
  &.right { right: -30px; }

  @media (max-width: 960px) {
    &.left { left: 10px; }
    &.right { right: 10px; }
  }
`;

const Achievements = () => {
  const [index, setIndex] = useState(0);
  const [leetcodeData, setLeetcodeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const leetcodeUsername = "Maha_0604";

  useEffect(() => {
    let mounted = true;

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
      if (!mounted) return;

      setLoading(true);
      setError("");

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

          if (normalized && mounted) {
            setLeetcodeData(normalized);
            setLoading(false);
            return;
          }
        } catch (fetchError) {
          // try the next endpoint
        }
      }

      if (mounted) {
        setError("Unable to fetch live stats right now.");
        setLoading(false);
      }
    };

    fetchLeetcodeStats();
    const intervalId = setInterval(fetchLeetcodeStats, 60000);

    return () => {
      mounted = false;
      clearInterval(intervalId);
    };
  }, []);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % achievements.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + achievements.length) % achievements.length);
  };

  return (
    <Container id="achievements">
      <Wrapper>
        <Title>Achievements</Title>

        <LeetcodeWidget>
          <WidgetHeader>
            <WidgetTitleBlock>
              <WidgetTitle>LeetCode Live Widget</WidgetTitle>
              <WidgetSubtitle>Live problem-solving stats for @{leetcodeUsername}</WidgetSubtitle>
            </WidgetTitleBlock>
            <WidgetStatus $active={!loading && !error}>Live</WidgetStatus>
          </WidgetHeader>

          {loading ? (
            <div style={{ color: "#cbd5e1", fontSize: "14px" }}>Loading live stats...</div>
          ) : error ? (
            <div style={{ color: "#ff6b6b", fontSize: "14px" }}>{error}</div>
          ) : (
            <WidgetGrid>
              <WidgetItem>
                <WidgetValue>{leetcodeData?.ranking?.toLocaleString() || "N/A"}</WidgetValue>
                <WidgetLabel>Rank</WidgetLabel>
              </WidgetItem>
              <WidgetItem>
                <WidgetValue>{leetcodeData?.totalSolved ?? 0}</WidgetValue>
                <WidgetLabel>Total Problems</WidgetLabel>
              </WidgetItem>
              <WidgetItem>
                <WidgetValue $tone="easy">{leetcodeData?.easySolved ?? 0}</WidgetValue>
                <WidgetLabel>Easy</WidgetLabel>
              </WidgetItem>
              <WidgetItem>
                <WidgetValue>{leetcodeData?.mediumSolved ?? 0}</WidgetValue>
                <WidgetLabel>Medium</WidgetLabel>
              </WidgetItem>
              <WidgetItem>
                <WidgetValue $tone="hard">{leetcodeData?.hardSolved ?? 0}</WidgetValue>
                <WidgetLabel>Hard</WidgetLabel>
              </WidgetItem>
              
            </WidgetGrid>
          )}
        </LeetcodeWidget>
        
        <CarouselContainer>
          <NavButton className="left" onClick={handlePrev}>
            <ArrowBackIosNew fontSize="small" />
          </NavButton>

          <AnimatePresence mode="wait">
            <Card
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <ImageContainer>
                <Image src={achievements[index].image} alt={achievements[index].title} />
              </ImageContainer>
              
              <Content>
                <AchievementTitle>{achievements[index].title}</AchievementTitle>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <ResultBadge>{achievements[index].result}</ResultBadge>
                  <DateText>{achievements[index].date}</DateText>
                </div>
                <Description>{achievements[index].desc}</Description>
              </Content>
            </Card>
          </AnimatePresence>

          <NavButton className="right" onClick={handleNext}>
            <ArrowForwardIos fontSize="small" />
          </NavButton>
        </CarouselContainer>
      </Wrapper>
    </Container>
  );
};

export default Achievements;