import { Link, useNavigate } from '@tanstack/react-router';
import styled from 'styled-components';
import mobileHeaderImage from '/assets/home/mobile/image-header.jpg';

import { useAppSelector } from '../../app/hooks';
import Button from '../buttons/Button';

type BannerProps = {
  slug: string;
};

const Banner = ({ slug }: BannerProps) => {
  const { product } = useAppSelector(state => state.product);
  const navigate = useNavigate();

  // find prodcut by name
  const findProduct = product?.find(product => product.slug === slug);
  //product id to string
  const productId = findProduct?.id.toString();

  const handleSeeProduct = () => {
    navigate({
      to: '/product/$id',
      params: {
        id: productId || '',
      },
    });
  };

  return (
    <BannerContainer>
      <BannerImage src={mobileHeaderImage} alt='banner' />
      <Content>
        <Title>New Product</Title>
        <ProductTitle>XX99 Mark II Headphones</ProductTitle>
        <ProductDescription>
          Experience natural, lifelike audio and exceptional build quality made
          for the passionate music enthusiast.
        </ProductDescription>
        <Button
          text='see product'
          bgColor='#D87D4A'
          color='#fff'
          onClick={handleSeeProduct}
          hoverColor='#FBAF85'
        />
      </Content>
    </BannerContainer>
  );
};

const BannerContainer = styled.div`
  width: 100%;

  position: relative;
`;

const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 0 24px;
`;

const Title = styled.h1`
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  letter-spacing: 10px;
  text-transform: uppercase;

  color: #ffffff;

  mix-blend-mode: normal;
  opacity: 0.5;

  margin-bottom: 16px;
`;

const ProductTitle = styled.h2`
  font-weight: 700;
  font-size: 36px;
  line-height: 40px;
  /* or 111% */

  text-align: center;
  letter-spacing: 1.28571px;
  text-transform: uppercase;

  color: #ffffff;

  margin-bottom: 24px;
`;

const ProductDescription = styled.p`
  text-align: center;
  color: #ffffff;
  mix-blend-mode: normal;
  opacity: 0.75;
  margin-bottom: 28px;
`;
export default Banner;
