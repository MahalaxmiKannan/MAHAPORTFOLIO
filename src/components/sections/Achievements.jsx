import React, { useState } from "react";
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