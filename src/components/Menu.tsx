import { useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../app/hooks';
import MenuItems from './MenuItems';
import {
  EarphonesImage,
  HeadphonesImage,
  SpeakersImage,
} from '../../public/assets/shared';
import { device } from '../styles/media';

type categoryProps = {
  category?: string;
  image: string;
};

type MenuProps = {
  homePage?: boolean;
};

const Menu = ({ homePage }: MenuProps) => {
  const { product } = useAppSelector(state => state.product);
  const [categories, setCategories] = useState<categoryProps[]>([
    { category: 'headphones', image: HeadphonesImage },
    { category: 'speakers', image: SpeakersImage },
    { category: 'earphones', image: EarphonesImage },
  ]);

  return (
    <MenuContainer homePage={homePage}>
      {categories.map((category, i) => (
        <MenuItems
          key={i}
          category={category.category}
          image={category.image}
        />
      ))}
    </MenuContainer>
  );
};

const MenuContainer = styled.div<MenuProps>`
  position: ${({ homePage }) => (homePage ? 'flex' : 'absolute')};
  background: ${({ theme }) => theme.colors.white};
  width: 100%;
  padding: 32px 0px 35px 0px;
  display: flex;
  flex-direction: column;
  gap: 68px;

  top: 0;
  left: 0;
  z-index: 100;
  border-radius: 0px 0px 8px 8px;

  @media ${device.tablet} {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 0px;
    margin-top: 96px;
  }
`;

export default Menu;
