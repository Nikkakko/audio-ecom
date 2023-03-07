import { Link, useNavigate } from '@tanstack/react-router';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setIsMenuOpen } from '../features/productSlice';
import { device } from '../styles/media';
import HeadphonesIcon from '../svgs/HeadphonesIcon';
import Button from './buttons/Button';

type MenuItemsProps = {
  category: string | undefined;
  image: string;
};

const MenuItems = ({ category, image }: MenuItemsProps) => {
  const { product } = useAppSelector(state => state.product);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // find iamge by category

  const handleClick = () => {
    navigate({
      to: '/category/$category',
      params: {
        category: category || '/',
      },
    });

    dispatch(setIsMenuOpen(false));
  };

  return (
    <MenuItemsContainer>
      <CategoryImage src={image} alt='category' />

      <Content>
        <CategoryTitle>{category}</CategoryTitle>
        <Button
          text='Shop'
          onClick={handleClick}
          bgColor='transparent'
          color='rgba(0, 0, 0, 0.5)'
          icon
        />
      </Content>
    </MenuItemsContainer>
  );
};

const MenuItemsContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* margin: 0 24px; */

  &:first-child {
    margin-top: 64px;
  }

  background: ${({ theme }) => theme.colors.antiFlashWhite};
  border-radius: 8px;

  @media ${device.tablet} {
    width: 223px;
    height: 165px;
    &:first-child {
      margin-top: 0;
    }
  }
`;

const CategoryImage = styled.img`
  position: absolute;
  width: 80px;
  height: auto;
  object-fit: cover;
  bottom: 70%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 88px;
`;

const CategoryTitle = styled.h3`
  font-weight: 700;
  font-size: 15px;
  line-height: 20px;
  text-align: center;
  letter-spacing: 1.07143px;
  text-transform: uppercase;

  color: #000000;
`;

export default MenuItems;
