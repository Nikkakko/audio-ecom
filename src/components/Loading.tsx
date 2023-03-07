import React from 'react';
import styled from 'styled-components';

const Loading = () => {
  return <Spinner></Spinner>;
};

const Spinner = styled.div`
  // make spinner loader
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  background-color: #101010f8;

  &::after {
    content: '';
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: 3px solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: spinner 1.2s linear infinite;

    @keyframes spinner {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
`;
export default Loading;
