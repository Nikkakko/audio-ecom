import styled from 'styled-components';
import { device } from '../../styles/media';
import { BannerAvatar } from '../../../public/assets/shared/mobile';
import { TabletBannerAvatar } from '../../../public/assets/shared/tablet';

const HomeFooter = () => {
  return (
    <HomeFooterContainer>
      <Picture>
        <source srcSet={TabletBannerAvatar} media='(min-width: 768px)' />
        <Avatar src={BannerAvatar} alt='avatar' />
      </Picture>

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
`;

const Avatar = styled.img`
  border-radius: 8px;
  width: 100%;
  height: 100%;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`;

const Title = styled.h4`
  color: #000000;
  text-align: center;
  margin-top: 40px;

  span {
    color: #d87d4a;
  }
`;

const Description = styled.p`
  color: #000000;
  text-align: center;
  opacity: 0.5;
`;

const Picture = styled.picture``;

export default HomeFooter;
