import { createBrowserHistory, useNavigate } from '@tanstack/react-router';
import { CartItemProps } from '../types/productType';

export function calculateTotalPrice(cartItems: CartItemProps[]) {
  return cartItems.reduce((acc, item) => {
    const quantity = item?.quantity ?? 0;
    return acc + item.price * quantity;
  }, 0);
}

export function calculateVAT(totalPrice: number): string {
  const VAT = totalPrice * 0.2;
  return formatPrice(VAT);
}

//format price
export function formatPrice(price: number) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  });
  const formattedPrice = formatter.format(price);
  return formattedPrice;
}

//format name
export function formatName(name: string) {
  // only first word of name
  const formattedName = name.split(' ')[0];
  return formattedName;
}

//navigate to back
export function useGoBack() {
  const history = createBrowserHistory();
  const navigate = useNavigate();

  return () => {
    if (history.back.length > 2) {
      history.back();
    } else {
      navigate({
        to: '/',
      });
    }
  };
}

export function useGoHome() {
  const navigate = useNavigate();
  return () => {
    navigate({
      to: '/',
    });
  };
}
