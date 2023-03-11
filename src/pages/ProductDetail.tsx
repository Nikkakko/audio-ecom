import React, { useEffect, useState } from 'react';
import {
  createBrowserHistory,
  useNavigate,
  useParams,
} from '@tanstack/react-router';
import styled from 'styled-components';
import { useAppSelector } from '../app/hooks';
import Button from '../components/buttons/Button';
import { addCartItems, setProduct } from '../features/productSlice';
import { useDispatch } from 'react-redux';
import { Menu } from '../components';
import { HomeFooter } from '../components/home';
import { GalleryImages, OtherProduct } from '../types/productType';
import { device } from '../styles/media';
import { getAllProducts } from '../features/asyncthunk';

const ProductDetail = () => {
  const { product, cartItems } = useAppSelector(state => state.product);
  const [qty, setQty] = useState<number>(1);

  //@ts-ignore
  const { id } = useParams() as string;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const history = createBrowserHistory();

  // navigate back to previous page

  useEffect(() => {
    if (product.length < 1) {
      dispatch(
        //get product from local storage
        setProduct(JSON.parse(localStorage.getItem('product') || '[]'))
      );
    }
  }, []);

  const handleBack = () => {
    history.back();
  };

  const paramsId = parseInt(id);
  const findProduct = product?.find(item => item.id === paramsId);
  const formatPrice = findProduct?.price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  });

  // find product gallery and turn it into an array
  const productGallery = Object.values(
    findProduct?.gallery ?? {}
  ) as GalleryImages[];

  const otherProducts = Object.values(
    findProduct?.others ?? ({} as OtherProduct[])
  );

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
        <ProductWrapper>
          <ProductImage>
            <ProductImg src={findProduct?.image.mobile} alt='product' />
          </ProductImage>

          <Info>
            <NewProduct>{findProduct?.new && 'New Product'}</NewProduct>
            <Title>{findProduct?.name}</Title>
            <Desc>{findProduct?.description}</Desc>
            <Price>{formatPrice}</Price>

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
          </Info>
        </ProductWrapper>

        <BoxWrapper>
          <Features>
            <FeatureTitle>Features</FeatureTitle>
            <Feature>{findProduct?.features}</Feature>
          </Features>

          <Specs>
            <SpecTitle>In The Box</SpecTitle>
            <SpecItems>
              {findProduct?.includes.map((item, index) => (
                <Items key={index}>
                  <ItemQuantity>{item.quantity}x</ItemQuantity>
                  <ItemDesc>{item.item}</ItemDesc>
                </Items>
              ))}
            </SpecItems>
          </Specs>
        </BoxWrapper>

        <Gallery>
          <GalleryImage>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              <Image
                src={findProduct?.gallery.first.mobile}
                alt='product gallery'
              />
              <Image
                src={findProduct?.gallery.second.mobile}
                alt='product gallery'
              />
            </div>

            <div>
              <Image
                src={findProduct?.gallery.third.mobile}
                alt='product gallery'
              />
            </div>
          </GalleryImage>
        </Gallery>

        <Others>
          <OtherTitle>You may also like</OtherTitle>

          <OtherProductItems>
            {otherProducts.map((item, index) => (
              <OtherProductWrapper key={index}>
                <Image src={item?.image.mobile} alt='product' />
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
          </OtherProductItems>
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

  @media ${device.laptopL} {
    padding: 0 165px;
  }

  @media ${device.mobileL} {
    padding: 0 24px;
  }
`;

const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media ${device.tablet} {
    flex-direction: row;
    /* align-items: center; */
    gap: 69.5px;
  }
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

  @media ${device.tablet} {
    gap: 0;
    margin-bottom: 32px;
    flex: 1;
  }

  @media ${device.laptopL} {
    max-width: 445px;
  }
`;

const ProductImage = styled.div`
  border-radius: 8px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.lotionWhite};
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* display: block; */
`;

const ProductImg = styled(Image)`
  width: 327px;
  height: 327px;
  border-radius: 8px;

  @media ${device.tablet} {
    width: 281px;
    height: 480px;
  }

  @media ${device.laptopL} {
    width: 540px;
    height: 560px;
  }
`;

const NewProduct = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 10px;
  text-transform: uppercase;

  color: #d87d4a;
`;

const Title = styled.h4`
  @media ${device.tablet} {
    /* padding: 0 140px 0 0; */
    margin-top: 17px;
  }

  @media ${device.laptopL} {
    padding: 0 140px 0 0;
  }
`;

const Desc = styled.p`
  color: #000000;

  mix-blend-mode: normal;
  opacity: 0.5;

  @media ${device.tablet} {
    margin-top: 32px;
    /* padding: 0 140px 0 0; */
  }

  @media ${device.laptopL} {
    margin-bottom: 32px;
  }
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

const BoxWrapper = styled.div`
  @media ${device.laptopL} {
    display: flex;
    gap: 125px;
  }
`;

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
  width: 100%;

  @media ${device.tablet} {
    flex-direction: row;
  }

  @media ${device.laptopL} {
    flex-direction: column;
  }
`;

const SpecItems = styled.div`
  display: flex;
  flex-direction: column;
`;

const SpecTitle = styled.h5`
  width: 339px;
  height: fit-content;
`;

const Items = styled.div`
  display: flex;
  gap: 24px;

  &:first-of-type {
    margin-top: 24px;
  }

  &:not(:first-of-type) {
    margin-top: 8px;
  }

  @media ${device.tablet} {
    &:first-of-type {
      margin-top: 0;
    }
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

  @media ${device.tablet} {
  }
`;

const GalleryImage = styled.div`
  display: flex;
  overflow: hidden;
  flex-direction: column;
  gap: 24px;

  img {
    border-radius: 8px;
  }

  @media ${device.tablet} {
    flex-direction: row;
  }
`;

const Others = styled.div`
  margin-top: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${device.tablet} {
  }

  @media ${device.laptopL} {
  }
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

  @media ${device.tablet} {
    /* margin-top: 56px; */
    margin-bottom: 0px;

    &:first-of-type {
      margin-top: 56px;
    }

    margin-top: 56px;
  }

  @media ${device.laptopL} {
    margin-top: 64px;

    img {
      width: 100%;
      height: 100%;
    }

    h4 {
      padding: 0;
    }
  }
`;

const OtherProductItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;

  @media ${device.tablet} {
    flex-direction: row;
  }
`;

const GoBack = styled.p`
  color: #000000;
  mix-blend-mode: normal;
  opacity: 0.5;
  margin-bottom: 24px;
`;

export default ProductDetail;
