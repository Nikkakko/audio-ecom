import { useParams } from '@tanstack/react-router';
import { useEffect } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Menu, MenuItems } from '../components';
import { Banner, HomeProducts } from '../components/home';
import Loading from '../components/Loading';
import { getAllProducts } from '../features/asyncthunk';

const Home = () => {
  const dispatch = useAppDispatch();
  const { product, isLoading } = useAppSelector(state => state.product);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

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
`;
export default Home;
