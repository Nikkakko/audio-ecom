import styled from 'styled-components';
import { CartItemProps } from '../types/productType';
import { formatName, formatPrice } from '../utils/func';

type Props = {
  item: CartItemProps;
};

const CartItem = ({ item }: Props) => {
  return (
    <CartItemWrapper>
      <InfoWrapper>
        <CartImage src={item.image?.mobile} alt={item.name} />
        <div>
          <CartName>{formatName(item.name)}</CartName>
          <CartPrice>{formatPrice(item.price)}</CartPrice>
        </div>
      </InfoWrapper>
      <Quantity>x{item.quantity}</Quantity>
    </CartItemWrapper>
  );
};

const Quantity = styled.p`
  color: #000000;
  mix-blend-mode: normal;
  opacity: 0.5;
`;

const CartItemWrapper = styled.div`
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

export default CartItem;
