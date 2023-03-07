import { useNavigate } from '@tanstack/react-router';
import React from 'react';
import { useAppSelector } from '../app/hooks';

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const navigate = useNavigate();
  const { cartItems } = useAppSelector(state => state.product);

  if (cartItems.length < 1) {
    return navigate({
      to: '/',
    });
  }

  return <>{children}</>;
};

export default ProtectedRoute;
