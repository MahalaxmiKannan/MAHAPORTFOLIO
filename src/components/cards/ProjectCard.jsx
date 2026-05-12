import React from "react";
import styled from "styled-components";

const Card = styled.div`
  width: 100%;
  max-width: 330px;
  min-height: 560px;
  background-color: ${({ theme }) => theme.card};
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0 0 12px 4px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  padding: 26px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-sizing: border-box;
  transition: all 0.5s ease-in-out;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 0 50px 4px rgba(0, 0, 0, 0.6);
    filter: brightness(1.1);
  }
`;
const Image = styled.img`
  width: 100%;
  height: 180px;
  background-color: ${({ theme }) => theme.white};
  border-radius: 10px;
  box-shadow: 0 0 16px 2px rgba(0, 0, 0, 0.3);
  flex-shrink: 0;
`;
const Tags = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
  min-height: 58px;
  align-content: flex-start;
`;
const Tag = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
  background: ${({ theme }) => theme.primary + "18"};
  border: 1px solid ${({ theme }) => theme.primary + "40"};
  border-radius: 999px;
  padding: 4px 10px;
  white-space: nowrap;
`;
const Details = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0px;
  padding: 0px 2px;
  flex: 1;
`;
const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  overflow: hidden;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Date = styled.div`
  font-size: 12px;
  margin-left: 2px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 80};
  @media only screen and (max-width: 768px) {
    font-size: 10px;
  }
`;
const Description = styled.div`
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 99};
  margin-top: 8px;
  max-width: 100%;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 92px;
`;

const Footer = styled.div`
  margin-top: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 2px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.primary + "30"};
`;

const Members = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;
`;
const Avatar = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  margin-left: -10px;
  background-color: ${({ theme }) => theme.white};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border: 3px solid ${({ theme }) => theme.card};
`;
const Button = styled.a`
  color: ${({ theme }) => theme.primary};
  padding: 0px 10px;
  text-decoration: none;
  font-weight: 600;
  text-align: center;
  align-self: center;
  margin-top: 2px;
`;

const ProjectCard = ({ project }) => {
  return (
    <Card>
      <Image src={project.image} />
      <Details>
        <Title>{project.title}</Title>
        <Date>{project.date}</Date>
        <Description>{project.description}</Description>
        <Tags>
          {project.tags?.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </Tags>
      </Details>
      <Footer>
        <Divider />
        <Members>
          {project.member?.map((member) => (
            <Avatar src={member.img} />
          ))}
        </Members>
        <Button href={project.github} target="_blank" rel="noopener noreferrer">
          View Code
        </Button>
      </Footer>
    </Card>
  );
};

export default ProjectCard;
