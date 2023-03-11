import { useNavigate } from '@tanstack/react-router';
import React from 'react';
import styled from 'styled-components';
import { Category } from '../../pages';
import { device } from '../../styles/media';
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

  @media ${device.tablet} {
    margin: 0;
    margin-top: 120px;
  }

  @media ${device.laptopL} {
    display: flex;
    &:nth-child(even) {
      flex-direction: row-reverse;
    }
    gap: 125px;

    /* margin: 0; */
  }
`;

const CategoryImage = styled.div``;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  object-fit: cover;

  @media ${device.tablet} {
    width: 689px;
    height: 352px;
  }

  @media ${device.laptopL} {
    width: 540px;
    height: 560px;
  }
`;

const Info = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 24px;

  @media ${device.tablet} {
    margin-top: 52px;
    padding: 0 98px;
    gap: 0;
  }

  @media ${device.laptopL} {
    max-width: 445px;
    padding: 0;
    align-items: flex-start;
    text-align: start;
  }
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

  @media ${device.tablet} {
    padding: 0 48px;
    margin-top: 16px;
    margin-bottom: 32px;
  }

  @media ${device.laptopL} {
    padding: 0 75px 0 0px;
  }
`;

const Description = styled.p`
  text-align: center;
  color: #000000;
  mix-blend-mode: normal;
  opacity: 0.5;

  @media ${device.tablet} {
    margin-bottom: 24px;
  }

  @media ${device.laptopL} {
    text-align: start;
  }
`;

export default CategoryProduct;
