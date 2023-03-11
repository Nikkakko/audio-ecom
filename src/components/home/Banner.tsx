import { Link, useNavigate } from '@tanstack/react-router';
import styled from 'styled-components';
import mobileHeaderImage from '/assets/home/mobile/image-header.jpg';
import { TabletHeaderImage } from '../../../public/assets/home/tablet';
import { DesktopHeaderImage } from '../../../public/assets/home/desktop';

import { useAppSelector } from '../../app/hooks';
import Button from '../buttons/Button';
import { device } from '../../styles/media';

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
      <picture>
        <source
          media='
        (min-width: 768px) and (max-width: 1023px),
        '
          srcSet={TabletHeaderImage}
        />
        <source
          media='
        (min-width: 1024px) and (max-width: 2440px),
        '
          srcSet={DesktopHeaderImage}
        />

        <BannerImage src={mobileHeaderImage} alt='banner' />
      </picture>
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

  @media (min-width: 768px) {
  }

  @media ${device.laptopL} {
    height: 100vh;
  }
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

  @media ${device.tablet} {
    padding: 0 203px;
  }

  @media ${device.laptopL} {
    padding: 0;
    width: 398px;
    //set content to left side
    left: 25%;

    align-items: flex-start;
  }
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

  @media ${device.laptopL} {
    text-align: start;
  }
`;

const ProductDescription = styled.p`
  text-align: center;
  color: #ffffff;
  mix-blend-mode: normal;
  opacity: 0.75;
  margin-bottom: 28px;

  @media ${device.laptopL} {
    text-align: start;
  }
`;
export default Banner;
