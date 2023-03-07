import { useNavigate } from '@tanstack/react-router';
import React from 'react';
import styled from 'styled-components';
import { Category } from '../../pages';
import { ProductType } from '../../types/productType';
import Button from '../buttons/Button';
import Menu from '../Menu';
import MenuItems from '../MenuItems';

type CategoryProductProps = {
  product: ProductType;
};

const CategoryProduct = ({ product }: CategoryProductProps) => {
  const navigate = useNavigate();
  const handleProductClick = () => {
    navigate({
      to: '/product/$id',
      params: {
        id: product.id.toString() || '/',
      },
    });
  };

  return (
    <Container>
      <CategoryImage>
        <Image src={product.categoryImage.mobile} alt='category' />
      </CategoryImage>

      <Info>
        <NewProduct>{product.new && 'New Product'}</NewProduct>
        <CategoryTitle>{product.name}</CategoryTitle>
        <Description>{product.description}</Description>
        <Button
          text='See Product'
          bgColor='#D87D4A'
          color='#FFFFFF'
          onClick={handleProductClick}
          hoverColor='#FBAF85'
        />
      </Info>
    </Container>
  );
};

const Container = styled.div`
  margin: 64px 0px;
`;

const CategoryImage = styled.div`
  background: ${({ theme }) => theme.colors.antiFlashWhite};
  padding: 41px 53px 68px 54px;
  border-radius: 8px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Info = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 24px;
`;

const NewProduct = styled.p`
  color: ${({ theme }) => theme.colors.peru};
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  letter-spacing: 10px;
  text-transform: uppercase;
`;

const CategoryTitle = styled.h4`
  padding: 0 24px;
`;

const Description = styled.p`
  text-align: center;
  color: #000000;
  mix-blend-mode: normal;
  opacity: 0.5;
`;

export default CategoryProduct;
