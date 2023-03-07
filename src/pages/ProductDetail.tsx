import React, { useState } from 'react';
import {
  createBrowserHistory,
  useNavigate,
  useParams,
} from '@tanstack/react-router';
import styled from 'styled-components';
import { useAppSelector } from '../app/hooks';
import Button from '../components/buttons/Button';
import { addCartItems } from '../features/productSlice';
import { useDispatch } from 'react-redux';
import { Menu } from '../components';
import { HomeFooter } from '../components/home';
import { GalleryImages, OtherProduct } from '../types/productType';

const ProductDetail = () => {
  const { product, cartItems } = useAppSelector(state => state.product);
  const [qty, setQty] = useState<number>(1);

  //@ts-ignore
  const { id } = useParams() as string;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const history = createBrowserHistory();

  // navigate back to previous page

  const handleBack = () => {
    history.back();
  };

  const paramsId = parseInt(id);
  const findProduct = product.find(item => item.id === paramsId);
  const formatPrice = findProduct?.price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  });

  // find product gallery and turn it into an array
  const productGallery = Object.values(findProduct?.gallery as GalleryImages);

  const otherProducts = Object.values(findProduct?.others as OtherProduct[]);

  const handleQuantity = (change: string) => {
    // increase or decrease qty based on plus or minus button

    if (change === 'plus') {
      setQty(qty + 1);
    } else if (change === 'minus' && qty > 1) {
      setQty(qty - 1);
    }
  };

  const findProductId = (itemName: string) => {
    const findItem = product.find(item => item.slug === itemName);
    return navigate({
      to: '/product/$id',
      params: {
        id: findItem?.id?.toString() || '/',
      },
    });
  };

  const handleAddToCart = () => {
    let newProduct = {
      id: findProduct?.id,
      name: findProduct?.name,
      image: findProduct?.categoryImage,
      price: findProduct?.price,
      quantity: qty,
    };

    dispatch(addCartItems(newProduct));

    setQty(1);
  };

  return (
    <ProductDetailContainer>
      <Wrapper>
        <GoBack onClick={handleBack}>Go Back</GoBack>
        <ProductImage>
          <Image src={findProduct?.image.mobile} />
        </ProductImage>

        <Info>
          <NewProduct>{findProduct?.new && 'New Product'}</NewProduct>
          <Title>{findProduct?.name}</Title>
          <Desc>{findProduct?.description}</Desc>
          <Price>{formatPrice}</Price>
        </Info>

        <AddProduct>
          <Quantity>
            <Decrement onClick={() => handleQuantity('minus')}>-</Decrement>
            <ProductQty>{qty}</ProductQty>
            <Increment onClick={() => handleQuantity('plus')}>+</Increment>
          </Quantity>
          <Button
            text='Add to cart'
            type='button'
            onClick={() => handleAddToCart()}
            bgColor='#d87d4a'
            color='#fff'
            hoverColor='#FBAF85'
          />
        </AddProduct>

        <Features>
          <FeatureTitle>Features</FeatureTitle>
          <Feature>{findProduct?.features}</Feature>
        </Features>

        <Specs>
          <SpecTitle>In The Box</SpecTitle>
          {findProduct?.includes.map((item, index) => (
            <Items key={index}>
              <ItemQuantity>{item.quantity}x</ItemQuantity>
              <ItemDesc>{item.item}</ItemDesc>
            </Items>
          ))}
        </Specs>

        <Gallery>
          {productGallery.map((item, index) => (
            <GalleryImage key={index}>
              <Image src={item?.mobile} alt='product gallery' />
            </GalleryImage>
          ))}
        </Gallery>

        <Others>
          <OtherTitle>You may also like</OtherTitle>

          {otherProducts.map((item, index) => (
            <OtherProductWrapper key={index}>
              <Image src={item?.image.mobile} alt='other products' />
              <Title>{item?.name}</Title>
              <Button
                text='See Product'
                type='button'
                onClick={() => findProductId(item?.slug)}
                bgColor='#d87d4a'
                color='#fff'
                hoverColor='#FBAF85'
              />
            </OtherProductWrapper>
          ))}
        </Others>

        <Menu homePage />
        <HomeFooter />
      </Wrapper>
    </ProductDetailContainer>
  );
};

const ProductDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 65px 24px 0 24px;
  margin-top: 41px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 32px;
  gap: 24px;
`;

const ProductImage = styled.div`
  background: ${props => props.theme.colors.antiFlashWhite};
  border-radius: 8px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const NewProduct = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 10px;
  text-transform: uppercase;

  color: #d87d4a;
`;

const Title = styled.h4``;

const Desc = styled.p`
  color: #000000;

  mix-blend-mode: normal;
  opacity: 0.5;
`;

const Price = styled.p``;

const AddProduct = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 31px;
`;

const Quantity = styled.div`
  padding: 15px 15.5px;
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
    color: #fbaf85;
    opacity: 1;
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

const Features = styled.div`
  margin-top: 88px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const FeatureTitle = styled.h5``;

const Feature = styled.p`
  color: #000000;

  mix-blend-mode: normal;
  opacity: 0.5;
`;

const Specs = styled.div`
  margin-top: 88px;
  display: flex;
  flex-direction: column;
  /* gap: 8px; */

  //first child margin top 24px
`;

const SpecTitle = styled.h5``;

const Items = styled.div`
  display: flex;
  gap: 24px;

  &:first-of-type {
    margin-top: 24px;
  }

  &:not(:first-of-type) {
    margin-top: 8px;
  }
`;

const ItemQuantity = styled.span`
  font-weight: ${props => props.theme.fontWeight.bold};
  font-size: 15px;
  line-height: 25px;
  /* identical to box height, or 167% */

  color: #d87d4a;
`;

const ItemDesc = styled.p`
  color: ${props => props.theme.colors.black};
  mix-blend-mode: normal;
  opacity: 0.5;
`;

const Gallery = styled.div`
  margin-top: 88px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const GalleryImage = styled.div`
  display: flex;
  border-radius: 8px;
  overflow: hidden;
`;

const Others = styled.div`
  margin-top: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const OtherTitle = styled.h5``;

const OtherProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  margin-bottom: 56px;
  &:first-of-type {
    margin-top: 40px;
  }
`;

const GoBack = styled.p`
  color: #000000;
  mix-blend-mode: normal;
  opacity: 0.5;
  margin-bottom: 24px;
`;

export default ProductDetail;
