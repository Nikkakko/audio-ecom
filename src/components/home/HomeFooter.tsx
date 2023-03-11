import styled from 'styled-components';
import { device } from '../../styles/media';
import { BannerAvatar } from '../../../public/assets/shared/mobile';
import { TabletBannerAvatar } from '../../../public/assets/shared/tablet';
import ImageBestGear from '/assets/shared/desktop/image-best-gear.jpg';

const HomeFooter = () => {
  return (
    <HomeFooterContainer>
      <Avatar src={BannerAvatar} />

      <ContentWrapper>
        <Title>
          Bringing you the <span>best</span> audio gear
        </Title>
        <Description>
          Located at the heart of New York City, Audiophile is the premier store
          for high end headphones, earphones, speakers, and audio accessories.
          We have a large showroom and luxury demonstration rooms available for
          you to browse and experience a wide range of our products. Stop by our
          store to meet some of the fantastic people who make Audiophile the
          best place to buy your portable audio equipment.
        </Description>
      </ContentWrapper>
    </HomeFooterContainer>
  );
};

const HomeFooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 96px;

  @media ${device.laptopL} {
    flex-direction: row-reverse;
    gap: 125px;
    align-items: center;
    justify-content: center;
  }
`;

const Avatar = styled.img`
  border-radius: 8px;
  width: 100%;
  height: 100%;

  @media ${device.laptopL} {
    width: 540px;
    height: 588px;
    object-fit: cover;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;

  @media ${device.tablet} {
    padding: 0 58px;
  }

  @media ${device.laptopL} {
    max-width: 445px;
    padding: 0;
  }
`;

const Title = styled.h4`
  color: #000000;
  text-align: center;
  margin-top: 40px;

  span {
    color: #d87d4a;
  }

  @media ${device.tablet} {
    margin-top: 63px;
    padding: 0 50px;
  }

  @media ${device.laptopL} {
    padding: 0;
    margin: 0;
    text-align: start;
    padding: 0 75px 0 0;
  }
`;

const Description = styled.p`
  color: #000000;
  text-align: center;
  opacity: 0.5;

  @media ${device.laptopL} {
    text-align: start;
  }
`;

export default HomeFooter;
