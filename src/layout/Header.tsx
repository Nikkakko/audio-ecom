import { Link } from '@tanstack/react-router';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Menu } from '../components';
import Modal from '../components/Modals/CartModal';
import { setIsMenuOpen } from '../features/productSlice';
import { device } from '../styles/media';
import { HamburgerIcon, CartIcon, LogoIcon } from '../svgs';

const Header = () => {
  const { product, isMenuOpen, cartItems } = useAppSelector(
    state => state.product
  );
  const dispatch = useAppDispatch();
  const backdropRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClickOutside:
    | React.MouseEventHandler<HTMLDivElement>
    | undefined = e => {
    if (e.target === backdropRef.current) {
      dispatch(setIsMenuOpen(false));
    }
  };

  const handleCartClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <HeaderContainer>
      <Items>
        <HamburgerIcon onClick={() => dispatch(setIsMenuOpen(!isMenuOpen))} />
        <Link to='/' onClick={() => dispatch(setIsMenuOpen(false))}>
          <LogoIcon />
          {cartItems.length > 0 && (
            <CartItemsQuantity>
              {cartItems.length > 0 && cartItems.length}
            </CartItemsQuantity>
          )}
        </Link>
      </Items>
      <Modal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} />
      <CartIcon onClick={handleCartClick} />
      {isMenuOpen && (
        <Backdrop ref={backdropRef} onClick={handleClickOutside}>
          <Menu />
        </Backdrop>
      )}
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 37px 24px;
  height: 89px;
  width: 100%;
  background-color: #191919;
  z-index: 9999;

  // transferant background when scrolling
  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 14.61px;
    background: #131313;
    opacity: 0.2;
    position: absolute;
    top: 0;
    left: 0;
  }

  &::before {
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    background: ${({ theme }) => theme.colors.white};
    position: absolute;
    left: 0;
    bottom: 0;
    opacity: 0.1;
    mix-blend-mode: normal;
  }

  @media ${device.tablet} {
    &::before {
      width: 90%;
      left: 5%;
    }
  }
`;

const CartItemsQuantity = styled.div`
  position: absolute;
  top: 25px;
  right: 15px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.peru};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.white};
`;

const Items = styled.div`
  display: flex;
  align-items: center;
  gap: 76px;

  @media ${device.mobileL} {
    gap: calc((100vw - 24px * 2 - 16px * 2 - 42px * 2) / 3);
  }
  @media ${device.tablet} {
    display: flex;
    gap: 42px;
  }
`;

const Backdrop = styled.div`
  width: 100vw;
  height: calc(100vh - 89px);
  position: absolute;

  left: 0;
  top: 89px;
  background-color: rgba(0, 0, 0, 0.5);

  z-index: 100;
`;

export default Header;
