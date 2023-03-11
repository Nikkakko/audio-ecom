import { useNavigate } from '@tanstack/react-router';
import React, { FC, useRef } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  changeCartItemsQuantity,
  removeCartItems,
  setProductQuantity,
} from '../../features/productSlice';
import { device } from '../../styles/media';
import { calculateTotalPrice, formatName, formatPrice } from '../../utils/func';
import Button from '../buttons/Button';

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const Modal: FC<ModalProps> = ({ isOpen, closeModal }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { cartItems } = useAppSelector(state => state.product);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  if (!isOpen) return null;

  // navigate to checkout page
  const handleCheckout = () => {
    if (cartItems.length < 1) {
      return;
    }
    navigate({
      to: '/checkout',
    });
    closeModal();
  };
  const totalPrice = calculateTotalPrice(cartItems);

  const handleClickOutside:
    | React.MouseEventHandler<HTMLDivElement>
    | undefined = e => {
    if (e.target === modalRef.current) {
      closeModal();
    }
  };

  const handleQuantity = (change: string, itemId: number) => {
    dispatch(changeCartItemsQuantity({ type: change, id: itemId }));
  };

  return createPortal(
    <ModalWrapper ref={modalRef} onClick={handleClickOutside}>
      <ModalCard>
        <ModalHeader>
          <h6>Cart ({cartItems.length})</h6>
          <RemoveItems onClick={() => dispatch(removeCartItems())}>
            Remove all
          </RemoveItems>
        </ModalHeader>
        <ModalItems>
          {cartItems.map(item => (
            <CartItem key={item.id}>
              <InfoWrapper>
                <CartImage src={item.image?.mobile} alt={item.name} />
                <div>
                  <CartName>{formatName(item.name)}</CartName>
                  <CartPrice>{formatPrice(item.price)}</CartPrice>
                </div>
              </InfoWrapper>

              <Quantity>
                <Decrement onClick={() => handleQuantity('minus', item.id)}>
                  -
                </Decrement>
                <ProductQty>{item.quantity}</ProductQty>
                <Increment onClick={() => handleQuantity('plus', item.id)}>
                  +
                </Increment>
              </Quantity>
            </CartItem>
          ))}
        </ModalItems>
        {
          // if cartItems is empty, show empty cart message
          cartItems.length === 0 && (
            <EmptyCart>
              <h6>Your cart is empty</h6>
            </EmptyCart>
          )
        }

        <Total>
          <h6>Total</h6>
          <h6>{formatPrice(totalPrice)}</h6>
        </Total>

        <Button
          text='Checkout'
          bgColor='#D87D4A'
          color='#fff'
          onClick={handleCheckout}
          hoverColor='#FBAF85'
        />
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
`;

const ModalCard = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 32px 28px;

  background-color: #fff;
  border-radius: 8px;

  @media ${device.tablet} {
    position: absolute;
    left: 351px;
    top: 24px;
    width: 100%;
    max-width: 377px;
  }

  @media ${device.laptopL} {
    left: auto;
    right: 165px;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RemoveItems = styled.p`
  color: #000000;
  text-decoration: underline;

  mix-blend-mode: normal;
  opacity: 0.5;

  cursor: pointer;

  &:hover {
    opacity: 1;
    color: #fbaf85;
  }
`;

const ModalItems = styled.div`
  display: flex;
  flex-direction: column;

  gap: 24px;
`;

const Quantity = styled.div`
  padding: 7px 11.5px;
  background: ${props => props.theme.colors.antiFlashWhite};
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Decrement = styled.span`
  font-weight: 700;
  font-size: 13px;
  line-height: 18px;
  /* identical to box height */

  text-align: center;
  letter-spacing: 1px;
  text-transform: uppercase;

  color: #000000;

  mix-blend-mode: normal;
  opacity: 0.25;

  cursor: pointer;

  &:hover {
    opacity: 1;
    color: #fbaf85;
  }
`;

const ProductQty = styled.span`
  font-weight: 700;
  font-size: 13px;
  line-height: 18px;
  /* identical to box height */

  text-align: center;
  letter-spacing: 1px;
  text-transform: uppercase;

  color: #000000;
`;

const Increment = styled(Decrement)``;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  &:first-child {
    margin-top: 24px;
  }

  gap: 16px;
`;

const CartImage = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 8px;
`;

const CartName = styled.h6`
  font-weight: 700;
  font-size: 15px;
  line-height: 25px;
  /* identical to box height, or 167% */

  color: #000000;
`;

const CartPrice = styled.p`
  color: #000000;

  mix-blend-mode: normal;
  opacity: 0.5;
`;

const InfoWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  /* flex-direction: column; */
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 32px;
  margin-bottom: 24px;
`;

const EmptyCart = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export default Modal;
