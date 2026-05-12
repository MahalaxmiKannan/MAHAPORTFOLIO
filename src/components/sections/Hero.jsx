import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { Bio } from "../../data/constants";
import Typewriter from "typewriter-effect";
import HeroImg from "../../images/HeroImage.jpg";
import HeroBgAnimation from "../HeroBgAnimation";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
} from "../../utils/motion";
import StarCanvas from "../canvas/Stars";

const pulse = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.6; }
  100% { opacity: 1; }
`;

const AvailabilityBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  background-color: rgba(168, 85, 247, 0.12);
  border: 1px solid ${({ theme }) => theme.primary};
  border-radius: 50px;
  color: ${({ theme }) => theme.text_primary};
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 24px;
  
  @media (max-width: 960px) {
    font-size: 13px;
    padding: 6px 12px;
    margin-bottom: 16px;
  }
`;

const PulseDot = styled.div`
  width: 8px;
  height: 8px;
  background-color: ${({ theme }) => theme.primary};
  border-radius: 50%;
  animation: ${pulse} 2s infinite ease-in-out;
`;

const HeroContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  padding: 80px 30px;
  z-index: 1;

  @media (max-width: 960px) {
    padding: 66px 16px;
  }

  @media (max-width: 640px) {
    padding: 32px 16px;
  }

  clip-path: polygon(0 0, 100% 0, 100% 100%, 70% 95%, 0 100%);
`;
const HeroInnerContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1100px;

  @media (max-width: 960px) {
    flex-direction: column;
  }
`;
const HeroLeftContainer = styled.div`
  width: 100%;
  order: 1;
  @media (max-width: 960px) {
    order: 2;
    margin-bottom: 30px;
    display: flex;
    gap: 6px;
    flex-direction: column;
    align-items: center;
  }
`;
const HeroRightContainer = styled.div`
  width: 100%;
  order: 2;
  display: flex;
  justify-content: end;
  @media (max-width: 960px) {
    order: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-contents: center;
    margin-bottom: 80px;
  }

  @media (max-width: 640px) {
    margin-bottom: 30px;
  }
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 50px;
  color: ${({ theme }) => theme.text_primary};
  line-height: 68px;

  @media (max-width: 960px) {
    text-align: center;
  }

  @media (max-width: 960px) {
    font-size: 40px;
    line-height: 48px;
    margin-bottom: 8px;
  }
`;

const TextLoop = styled.div`
  font-weight: 600;
  font-size: 32px;
  display: flex;
  gap: 12px;
  color: ${({ theme }) => theme.text_primary};
  line-height: 68px;

  @media (max-width: 960px) {
    text-align: center;
  }

  @media (max-width: 960px) {
    font-size: 22px;
    line-height: 48px;
    margin-bottom: 16px;
  }
`;

const Span = styled.div`
  cursor: pointer;
  color: ${({ theme }) => theme.primary};
`;

const SubTitle = styled.div`
  font-size: 20px;
  line-height: 32px;
  margin-bottom: 42px;
  color: ${({ theme }) => theme.text_primary + 95};

  @media (max-width: 960px) {
    text-align: center;
  }

  @media (max-width: 960px) {
    font-size: 16px;
    line-height: 32px;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 34px;

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    width: 100%;
  }

  @media (max-width: 640px) {
    gap: 10px;
    margin-bottom: 26px;
  }
`;

const StatCard = styled.div`
  padding: 16px 18px;
  border-radius: 18px;
  background: rgba(17, 25, 40, 0.72);
  border: 1px solid rgba(168, 85, 247, 0.18);
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.22);
  backdrop-filter: blur(10px);
  text-align: center;

  @media (max-width: 640px) {
    padding: 14px 12px;
  }
`;

const StatValue = styled.div`
  font-size: 30px;
  font-weight: 700;
  line-height: 1;
  color: ${({ theme }) => theme.primary};

  @media (max-width: 640px) {
    font-size: 24px;
  }
`;

const StatLabel = styled.div`
  margin-top: 8px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};

  @media (max-width: 640px) {
    font-size: 13px;
  }
`;

const ResumeButton = styled.a`
  -webkit-appearance: button;
  -moz-appearance: button;
  appearance: button;
  text-decoration: none;

  width: auto;
  min-width: 180px;
  text-align: center;
  padding: 16px 28px;

  background: hsla(271, 100%, 50%, 1);
  background: linear-gradient(
    225deg,
    hsla(271, 100%, 50%, 1) 0%,
    hsla(294, 100%, 50%, 1) 100%
  );
  background: -moz-linear-gradient(
    225deg,
    hsla(271, 100%, 50%, 1) 0%,
    hsla(294, 100%, 50%, 1) 100%
  );
  background: -webkit-linear-gradient(
    225deg,
    hsla(271, 100%, 50%, 1) 0%,
    hsla(294, 100%, 50%, 1) 100%
  );
  box-shadow: 20px 20px 60px #1f2634, -20px -20px 60px #1f2634;
  border-radius: 50px;
  font-weight: 600;
  font-size: 20px;

     &:hover {
        transform: scale(1.05);
    transition: all 0.4s ease-in-out;
    box-shadow:  20px 20px 60px #1F2634,
    filter: brightness(1);
    }    
    
    
    @media (max-width: 640px) {
        padding: 12px 22px;
        font-size: 18px;
    } 
    color: white;
`;

const CTAGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: nowrap;

  @media (max-width: 960px) {
    justify-content: center;
  }
`;

const ContactAction = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContactCta = styled.a`
  -webkit-appearance: button;
  -moz-appearance: button;
  appearance: button;
  text-decoration: none;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: auto;
  min-width: 180px;
  text-align: center;
  padding: 16px 28px;

  background: transparent;
  border: 1px solid ${({ theme }) => theme.primary}80;
  border-radius: 50px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 600;
  font-size: 20px;
  box-shadow: 0 0 0 rgba(16, 185, 129, 0);
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease,
    background-color 0.18s ease;
  will-change: transform;

  &:hover {
    background-color: ${({ theme }) => theme.primary}14;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 12px 28px ${({ theme }) => theme.primary}26;
  }

  @media (max-width: 640px) {
    padding: 12px 22px;
    font-size: 18px;
  }
`;

const Img = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
  max-width: 400px;
  max-height: 400px;
  border: 2px solid ${({ theme }) => theme.primary};

  @media (max-width: 640px) {
    max-width: 280px;
    max-height: 280px;
  }
`;

const HeroBg = styled.div`
  position: absolute;
  display: flex;
  justify-content: end;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-width: 1360px;
  overflow: hidden;
  padding: 0 30px;
  top: 50%;
  left: 50%;
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);

  @media (max-width: 960px) {
    justify-content: center;
    padding: 0 0px;
  }
`;

const HERO_STATS = [
  { label: "Internships", target: 3, suffix: "" },
  { label: "Hackathons", target: 3, suffix: "" },
  { label: "LeetCode", target: 200, suffix: "+" },
  { label: "CGPA", target: 8.63, suffix: "" },
];

const Hero = () => {
  const stats = HERO_STATS;
  const [statValues, setStatValues] = useState(stats.map(() => 0));
  const [contactOffset, setContactOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const duration = 1500;
    const startTime = performance.now();
    let animationFrameId;

    const tick = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setStatValues(
        stats.map((stat) => {
          const value = stat.target * progress;
          return stat.label === "CGPA" ? Number(value.toFixed(2)) : Math.floor(value);
        })
      );

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(tick);
      }
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationFrameId);
  }, [stats]);

  const handleContactMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 12;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 8;
    setContactOffset({ x, y });
  };

  const resetContactMove = () => {
    setContactOffset({ x: 0, y: 0 });
  };

  return (
    <div id="About">
      <HeroContainer>
        <HeroBg>
          <StarCanvas />
          <HeroBgAnimation />
        </HeroBg>

        <motion.div {...headContainerAnimation}>
          <HeroInnerContainer>
            <HeroLeftContainer>
              <motion.div {...headTextAnimation}>
                <AvailabilityBadge>
                  <PulseDot />
                  Open to internships — Coimbatore & Remote — Available immediately
                </AvailabilityBadge>
                <Title>
                  Hi, I am <br /> {Bio.name}
                </Title>
                <TextLoop>
                  I am a
                  <Span>
                    <Typewriter
                      options={{
                        strings: Bio.roles,
                        autoStart: true,
                        loop: true,
                      }}
                    />
                  </Span>
                </TextLoop>
              </motion.div>

              <motion.div {...headContentAnimation}>
                <SubTitle>{Bio.description}</SubTitle>
              </motion.div>

              <motion.div {...headContentAnimation}>
                <StatsGrid>
                  {stats.map((stat, index) => (
                    <StatCard key={stat.label}>
                      <StatValue>
                        {stat.label === "CGPA"
                          ? statValues[index].toFixed(2)
                          : statValues[index]}
                        {stat.suffix}
                      </StatValue>
                      <StatLabel>{stat.label}</StatLabel>
                    </StatCard>
                  ))}
                </StatsGrid>
              </motion.div>

              <CTAGroup>
                <ResumeButton href={Bio.resume} target="_blank" rel="noopener noreferrer">
                  Check Resume
                </ResumeButton>
                <ContactAction>
                  <ContactCta
                    href="#Contact"
                    onMouseMove={handleContactMove}
                    onMouseLeave={resetContactMove}
                    style={{
                      transform: `translate3d(${contactOffset.x}px, ${contactOffset.y}px, 0)`,
                    }}
                  >
                    Contact Me →
                  </ContactCta>
                </ContactAction>
              </CTAGroup>
            </HeroLeftContainer>
            <HeroRightContainer>
              <motion.div {...headContentAnimation}>
                <Tilt>
                  <Img src={HeroImg} alt="Rishav Chanda" />
                </Tilt>
              </motion.div>
            </HeroRightContainer>
          </HeroInnerContainer>
        </motion.div>
      </HeroContainer>
    </div>
  );
};

export default Hero;
