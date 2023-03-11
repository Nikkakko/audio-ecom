import { createBrowserHistory, useNavigate } from '@tanstack/react-router';
import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { removeCartItems } from '../../features/productSlice';
import { device } from '../../styles/media';
import { IconConfirmation } from '../../svgs';
import {
  calculateTotalPrice,
  calculateVAT,
  formatPrice,
  useGoBack,
  useGoHome,
} from '../../utils/func';
import Button from '../buttons/Button';
import CartItem from '../CartItem';

interface ModalProps {
  closeModal: () => void;
}

const CheckoutModal = ({ closeModal }: ModalProps) => {
  // check if isOpen is true then render the modal

  const modalRef = useRef<HTMLDivElement>(null);
  const { cartItems } = useAppSelector(state => state.product);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClickOutside:
    | React.MouseEventHandler<HTMLDivElement>
    | undefined = e => {
    if (e.target === modalRef.current) {
      closeModal();
      dispatch(removeCartItems());
    }
  };
  const totalPrice = calculateTotalPrice(cartItems);
  const grandTotal = totalPrice + 50;

  const handleClick = () => {
    navigate({
      to: '/',
    });

    // delete all items in the cart after checkout is complete and redirect to home page
    // set timeout to allow the modal to close before redirecting
    setTimeout(() => {
      dispatch(removeCartItems());
    }, 500);
  };

  return createPortal(
    <ModalWrapper ref={modalRef} onClick={handleClickOutside}>
      <ModalCard>
        <IconConfirmation />
        <InfoWrapper>
          <Title>thank you for your order</Title>
          <Confirm>You will receive an email confirmation shortly</Confirm>
        </InfoWrapper>

        <Items>
          <Wrapper>
            <CartItem item={cartItems[0]} />
            <Border />
            {cartItems.length > 1 ? (
              <OtherItems>
                And {cartItems.length - 1} the other item
                {cartItems.length > 2 ? '(s)' : ''}
              </OtherItems>
            ) : null}
          </Wrapper>

          <GrandTotal>
            <GrandTotalText>Grand Total</GrandTotalText>
            <GrandTotalPrice>{formatPrice(grandTotal)}</GrandTotalPrice>
          </GrandTotal>
        </Items>

        <Button
          onClick={handleClick}
          text='Back to home'
          color='#fff'
          bgColor='#D87D4A'
          hoverColor='#FBAF85'
        >
          Back to home
        </Button>
      </ModalCard>
    </ModalWrapper>,
    document.getElementById('modal-root') as HTMLElement
  );
};

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // transatle the modal down by the height of the header
  transform: translateY(89px);
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  padding: 24px;

  @media ${device.tablet} {
    padding: 13px 114px;
  }

  @media ${device.laptopL} {
    padding: 125px 450px;
  }
`;

const ModalCard = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 32px;

  background-color: #fff;
  border-radius: 8px;

  @media ${device.tablet} {
    padding: 48px;
  }
`;

const Title = styled.h4`
  line-height: 28px;
  letter-spacing: 0.857143px;
  text-align: start;

  @media ${device.tablet} {
    padding: 0px 208px 0px 0px;
  }
`;

const Confirm = styled.p`
  color: #000000;

  mix-blend-mode: normal;
  opacity: 0.5;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 23px;

  @media ${device.tablet} {
    gap: 24px;
    margin-bottom: 33px;
    align-items: flex-start;
  }
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;

  background: #f1f1f1;
  border-radius: 8px;

  @media ${device.tablet} {
    flex-direction: row;

    margin-bottom: 46px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 24px 24px 24px;

  @media ${device.tablet} {
    & > div {
      align-items: flex-start;

      & > div {
        align-items: flex-start;
      }
    }
  }
`;

const Border = styled.div`
  width: 100%;
  height: 1px;
  background: #000000;
  opacity: 0.1;
  margin: 12px 0px;
`;

const OtherItems = styled.p`
  text-transform: lowercase;
  color: #000000;

  mix-blend-mode: normal;
  opacity: 0.5;
  text-align: center;

  @media ${device.tablet} {
    text-align: start;
  }
`;

const GrandTotal = styled.div`
  display: flex;
  flex-direction: column;

  background: ${({ theme }) => theme.colors.black};
  border-radius: 8px;
  width: 100%;
  border-radius: 0px 0px 8px 8px;
  color: #fff;
  padding: 15px 24px 19px 24px;

  margin-bottom: 23px;

  gap: 8px;

  @media ${device.tablet} {
    border-radius: 0px 8px 8px 0px;
    margin-bottom: 0px;

    justify-content: center;
  }
`;

const GrandTotalText = styled.h6`
  font-weight: 500;
  font-size: 15px;
  line-height: 25px;
  /* identical to box height, or 167% */

  color: #ffffff;

  mix-blend-mode: normal;
  opacity: 0.5;
`;

const GrandTotalPrice = styled.h6`
  font-weight: 700;
  font-size: 18px;
  line-height: 25px;
  /* identical to box height */

  text-transform: uppercase;

  color: #ffffff;
`;

export default CheckoutModal;
