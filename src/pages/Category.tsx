import React from 'react';
import { useParams } from '@tanstack/react-router';
import styled from 'styled-components';
import { useAppSelector } from '../app/hooks';
import CategoryProduct from '../components/Category/CategoryProduct';
import { Menu } from '../components';
import { HomeFooter } from '../components/home';
import { useDispatch } from 'react-redux';
import { setProduct, sortByNewProduct } from '../features/productSlice';
import { device } from '../styles/media';

const Category = () => {
  const { product } = useAppSelector(state => state.product);
  const dispatch = useDispatch();
  const { category } = useParams();

  React.useEffect(() => {
    dispatch(sortByNewProduct());
  }, [category]);

  React.useEffect(() => {
    if (product.length < 1) {
      dispatch(
        //get product from local storage
        setProduct(JSON.parse(localStorage.getItem('product') || '[]'))
      );
    }
  }, []);

  return (
    <CategoryContainer>
      <CategoryHeader>
        <h4>{category}</h4>
      </CategoryHeader>

      <ProductWrapper>
        {product.map((product, i) => (
          <React.Fragment key={product.id}>
            {product.category === category && (
              <CategoryProduct product={product} />
            )}
          </React.Fragment>
        ))}
      </ProductWrapper>

      <SharedWrapper>
        <Menu homePage />
        <HomeFooter />
      </SharedWrapper>
    </CategoryContainer>
  );
};

const CategoryContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const SharedWrapper = styled.div`
  padding: 0 24px;

  @media ${device.tablet} {
    padding: 0 39px;
  }

  @media ${device.laptopL} {
    padding: 0 165px;
  }
`;

const CategoryHeader = styled.div`
  width: 100%;
  height: 100px;
  margin-top: 88px;
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;

  @media ${device.tablet} {
    height: 202px;
  }
`;

const ProductWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  padding: 0 24px;

  @media ${device.tablet} {
    padding: 0 39px;
  }

  @media ${device.laptopL} {
    padding: 0 165px;
  }
`;

export default Category;
