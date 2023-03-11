import styled from 'styled-components';
import PatterCircles from '../../svgs/PatterCircles';
import Button from '../buttons/Button';
import {
  MobileEarphones,
  MobileZx7SpeakerImage,
  MobileZx9SpeakerImage,
} from '../../../public/assets/home/mobile';
import {
  TabletEarphones,
  TabletHeaderImage,
  TabletZx9SpeakerImage,
  TabletZx7SpeakerImage,
} from '../../../public/assets/home/tablet';
import { DesktopZx9SpeakerImage } from '../../../public/assets/home/desktop';
import { useAppSelector } from '../../app/hooks';
import { Link } from '@tanstack/react-router';
import { device } from '../../styles/media';
import HomeFooter from './HomeFooter';

const HomeProducts = () => {
  const { product } = useAppSelector(state => state.product);

  //find product by title
  const findProduct = (title: string) => {
    return product.find(product => product.slug === title);
  };

  return (
    <HomeProductsContainer>
      <Zx9Speaker>
        <SpeakerImage src={DesktopZx9SpeakerImage} />
        {/* <PatterCircles size={279} /> */}
        <ContentWrapper>
          <ProductTitle>
            ZX9 <br />
            SPEAKER
          </ProductTitle>
          <Description>
            Upgrade to premium speakers that are phenomenally built to deliver
            truly remarkable sound.
          </Description>
          <Link
            to='/product/$id'
            params={{
              id: findProduct('zx9-speaker')?.id.toString() || '1',
            }}
          >
            <Button
              text='See Product'
              bgColor='black'
              color='white'
              hoverColor='#4C4C4C'
            />
          </Link>
        </ContentWrapper>
      </Zx9Speaker>
      <Zx7Speaker>
        <ProductTitleZx7>ZX7 SPEAKER</ProductTitleZx7>
        <Link
          to='/product/$id'
          params={{
            id: findProduct('zx7-speaker')?.id.toString() || '1',
          }}
        >
          <Button
            text='See Product'
            bgColor='transparent'
            color='black'
            border='1px solid black'
            hoverColor='#000000'
          />
        </Link>
      </Zx7Speaker>
      <Earphones>
        <EarphonesImage />

        <ProductWrapper>
          <EarPhonesTitle>YX1 EARPHONES</EarPhonesTitle>
          <Link
            to='/product/$id'
            params={{
              id: findProduct('yx1-earphones')?.id.toString() || '1',
            }}
          >
            <Button
              text='See Product'
              bgColor='transparent'
              color='black'
              border='1px solid black'
              hoverColor='#000000'
            />
          </Link>
        </ProductWrapper>
      </Earphones>
      <HomeFooter />
    </HomeProductsContainer>
  );
};

const HomeProductsContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  margin-top: 88px;

  gap: 24px;

  @media ${device.tablet} {
    margin-top: 64px;
  }
`;

const Zx9Speaker = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 55px 47px;

  gap: 24px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.peru};

  svg {
    //center the svg to the image
    position: absolute;
    top: 0;
    left: 23px;
    z-index: 0;
  }

  a {
    z-index: 100;
  }

  @media ${device.laptopL} {
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    padding: 96px 95px 0px 117px;
    gap: 138px;

    h2,
    p {
      text-align: left;
      padding: 0;
    }
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  @media ${device.tablet} {
    padding: 0 150px;
  }

  @media ${device.laptopL} {
    padding: 0;
    max-width: 349px;
    align-items: flex-start;
  }
`;

const SpeakerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;

  @media ${device.tablet} {
    width: 197.21px;
    height: 237px;
  }

  @media ${device.laptopL} {
    width: 410.23px;
    height: 483px;
  }
`;

const Earphones = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  gap: 24px;

  @media ${device.tablet} {
    flex-direction: row;
    gap: 11px;
  }

  @media ${device.laptopL} {
    gap: 30px;
  }
`;
const EarphonesImage = styled.div`
  background: url(${MobileEarphones}) no-repeat center;
  background-size: cover;
  width: 100%;
  border-radius: 8px;
  height: 200px;

  @media ${device.tablet} {
    height: auto;
    width: 50%;
  }

  @media ${device.laptopL} {
  }
`;

const EarPhonesTitle = styled.h2`
  font-size: 28px;
  line-height: 38px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.black};
  letter-spacing: 2px;

  @media ${device.tablet} {
  }
`;

const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 32px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.antiFlashWhite};
  padding: 41px 56px 41px 24px;

  @media ${device.tablet} {
    padding: 101px 51px 101px 41px;
  }

  @media ${device.laptopL} {
    padding: 101px 198px 101px 95px;
  }
`;

const ProductTitle = styled.h2`
  font-size: 36px;
  line-height: 40px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;

  br {
    display: none;
  }

  @media ${device.tablet} {
    padding: 0 44px;
    & br {
      display: block;
    }
  }

  @media ${device.laptopL} {
    font-size: 56px;
    line-height: 58px;
    letter-spacing: 2px;
    margin-top: 15px;
  }
`;
const ProductTitleZx7 = styled(ProductTitle)`
  color: ${({ theme }) => theme.colors.black};
  text-align: start;
  font-size: 28px;
  line-height: 38px;
  letter-spacing: 2px;
`;

const Description = styled.p`
  font-size: 15px;
  line-height: 25px;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  opacity: 0.75;

  @media ${device.tablet} {
  }

  @media ${device.laptopL} {
    margin-bottom: 16px;
  }
`;

const Zx7Speaker = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;

  padding: 101px 99px 101px 24px;

  background: url(${MobileZx7SpeakerImage}) no-repeat center;
  background-size: cover;

  @media ${device.tablet} {
    background: url(${TabletZx7SpeakerImage}) no-repeat center;
    background-size: cover;
    padding: 101px 0 130px 62px;
  }

  @media ${device.laptopL} {
    h2 {
      padding: 0;
    }

    padding: 101px 0 101px 96.5px;
  }
`;
export default HomeProducts;
