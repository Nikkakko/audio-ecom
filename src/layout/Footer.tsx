import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import styled from 'styled-components';
import { device } from '../styles/media';
import { LogoIcon } from '../svgs';
import { InstagramIcon, FacebookIcon, TwitterIcon } from '../svgs';

const Footer = () => {
  const ListItems = ['Home', 'Headphones', 'Speakers', 'Earphones'];
  return (
    <FooterContainer>
      <LogoIcon />
      <List>
        {ListItems.map((item, i) => (
          <Link
            key={i}
            to={item === 'Home' ? '/' : `/category/$category`}
            params={item === 'Home' ? {} : { category: item.toLowerCase() }}
          >
            <ListItem key={item}>{item}</ListItem>
          </Link>
        ))}
      </List>
      <Content>
        <Description>
          Audiophile is an all in one stop to fulfill your audio needs. We're a
          small team of music lovers and sound specialists who are devoted to
          helping you get the most out of personal audio. Come and visit our
          demo facility - we’re open 7 days a week.
        </Description>
      </Content>
      <Socials>
        <CopyRight>&copy; Copyright 2021. All Rights Reserved</CopyRight>

        <SocialIcons>
          <FacebookIcon />
          <TwitterIcon />
          <InstagramIcon />
        </SocialIcons>
      </Socials>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  margin-top: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: ${({ theme }) => theme.colors.black};

  svg {
    margin-top: 48px;
  }

  @media ${device.tablet} {
    align-items: start;
    padding: 60px 39px;
  }

  svg {
    @media ${device.tablet} {
      margin-top: 0;
    }
  }
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 48px;

  @media ${device.tablet} {
    flex-direction: row;
    gap: 34px;
    margin-top: 32px;
  }
`;
const ListItem = styled.li`
  color: ${({ theme }) => theme.colors.white};
  list-style: none;

  &:hover {
    color: #fbaf85;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;

  padding: 0 24px;

  @media ${device.tablet} {
    padding: 0;
  }
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.white};
  margin-top: 48px;
  text-align: center;
  opacity: 0.5;

  @media ${device.tablet} {
    text-align: start;
  }
`;

const CopyRight = styled.p`
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  opacity: 0.5;
  margin-bottom: 50px;

  @media ${device.tablet} {
    margin: 0;
  }
`;

const Socials = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 48px 0 40px 0;
  width: 100%;

  @media ${device.tablet} {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;

  svg {
    margin: 0;
  }
`;

export default Footer;
