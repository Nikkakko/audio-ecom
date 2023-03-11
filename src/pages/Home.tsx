import { useEffect } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Menu } from '../components';
import { Banner, HomeProducts } from '../components/home';
import Loading from '../components/Loading';
import { getAllProducts } from '../features/asyncthunk';
import { device } from '../styles/media';
import {} from '@tanstack/react-router';
import { setProduct } from '../features/productSlice';

const Home = () => {
  const dispatch = useAppDispatch();
  const { isLoading, product } = useAppSelector(state => state.product);

  useEffect(() => {
    if (product.length < 1) {
      dispatch(getAllProducts());
      localStorage.setItem('product', JSON.stringify(product));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('product', JSON.stringify(product));
  }, [product]);

  if (isLoading) return <Loading />;
  return (
    <HomePage>
      <Banner slug='xx99-mark-two-headphones' />
      <Wrapper>
        <Menu homePage />
        <HomeProducts />
      </Wrapper>
    </HomePage>
  );
};

const HomePage = styled.section`
  width: 100%;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 24px;

  @media ${device.laptopL} {
    padding: 0 165px;
  }
`;
export default Home;
