import { Navigate, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import styled from 'styled-components';
import { CartItemComponent } from '.';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  changeCartItemsQuantity,
  removeCartItems,
} from '../features/productSlice';
import {
  calculateTotalPrice,
  calculateVAT,
  formatName,
  formatPrice,
} from '../utils/func';
import Button from './buttons/Button';

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  openModal: any;
};

const SummaryDetails = ({ isOpen, closeModal, openModal }: Props) => {
  const { cartItems } = useAppSelector(state => state.product);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [shippingValue, setShippingValue] = useState(50);
  const totalPrice = calculateTotalPrice(cartItems);
  const twentyPercent = calculateVAT(totalPrice);

  const grandTotal = totalPrice + shippingValue;

  const details = [
    { label: 'Total', value: formatPrice(totalPrice) },
    { label: 'Shipping', value: formatPrice(shippingValue) },
    { label: 'VAT(INCLUDED)', value: twentyPercent },
    {
      label: 'Grand Total',
      value: formatPrice(grandTotal),
    },
  ];

  return (
    <Container>
      <ModalCard>
        <ModalHeader>
          <h6>Summary</h6>
        </ModalHeader>
        <ModalItems>
          {cartItems.map(item => (
            <CartItemComponent key={item.id} item={item} />
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
        <DetailsWrapper>
          {details?.map(detail => (
            <Details key={detail.label}>
              <h6>{detail.label}</h6>
              <h6>{detail.value}</h6>
            </Details>
          ))}
        </DetailsWrapper>
        <Button
          text='Continue & Pay'
          bgColor='#D87D4A'
          color='#fff'
          onClick={openModal}
          hoverColor='#FBAF85'
        />
      </ModalCard>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  background: #fff;
  border-radius: 8px;
  margin-top: 32px;
`;

const ModalCard = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 32px 24px;

  background-color: #fff;
  border-radius: 8px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalItems = styled.div`
  display: flex;
  flex-direction: column;

  gap: 24px;
`;

const Details = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  // margin top for first h6 element

  &:not(:last-child) {
    margin-bottom: 8px;
  }

  &:last-child {
    margin-top: 24px;
  }

  // choose the first h6 element
  & > h6:first-child {
    font-weight: 500;
    font-size: 15px;
    line-height: 25px;
    /* identical to box height, or 167% */
    color: #000000;
    mix-blend-mode: normal;
    opacity: 0.5;
  }

  // change last h6 element color
  &:last-child > h6:last-child {
    color: #d87d4a;
  }
`;

const EmptyCart = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const DetailsWrapper = styled.div`
  margin-top: 32px;
  margin-bottom: 32px;
`;

export default SummaryDetails;
