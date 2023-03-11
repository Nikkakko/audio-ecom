import { createBrowserHistory, useNavigate } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { InputField, RadioInput } from '../components';
import Modal from '../components/Modals/CartModal';
import CheckoutModal from '../components/Modals/CheckoutModal';
import SummaryDetails from '../components/SummaryDetails';
import { removeCartItems } from '../features/productSlice';
import { device } from '../styles/media';
import { useGoBack } from '../utils/func';

type InputProps = {
  firstName: string;
  email: string;
  phoneNumber: string;
  address: string;
  zipCode: string;
  city: string;
  country: string;
  eMoneyNumber: string;
  eMoneyPin: string;
};

const Checkout = () => {
  const { cartItems } = useAppSelector(state => state.product);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputProps>({
    defaultValues: {
      firstName: '',
      email: '',
      phoneNumber: '',
      address: '',
      zipCode: '',
      city: '',
      country: '',
      eMoneyNumber: '',
      eMoneyPin: '',
    },
  });

  const [paymentMethod, setPaymentMethod] = useState('e-Money');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate({
        to: '/',
      });
    }
  }, [cartItems.length]);

  const onSubmit: SubmitHandler<InputProps> = data => {
    setIsModalOpen(true);
  };

  return (
    <CheckoutContainer>
      <GoBack onClick={useGoBack()}>Go Back</GoBack>
      <Wrapper>
        <h4>Checkout</h4>

        <Details>Billing Details</Details>

        <BillingDetails>
          <InputField
            handleSubmit={handleSubmit(onSubmit)}
            label='Name'
            {...register('firstName', {
              required: 'Name is required',
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: 'Wrong format',
              },
            })}
            placeholder='Alexei'
            error={errors.firstName?.message}
          />

          <InputField
            handleSubmit={handleSubmit(onSubmit)}
            label='email address'
            placeholder='alexei@mail.com'
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Wrong format',
              },
            })}
            error={errors.email?.message}
          />

          <InputField
            handleSubmit={handleSubmit(onSubmit)}
            label='Phone Number'
            placeholder='+1 202-555-0136'
            {...register('phoneNumber', {
              required: 'Phone number is required',
              pattern: {
                value: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/i,
                message: 'Wrong format',
              },
            })}
            error={errors.phoneNumber?.message}
          />
        </BillingDetails>

        <Details>Shipping Info</Details>
        <ShippingInfo>
          <div
            style={{
              width: '100%',
            }}
          >
            <InputField
              handleSubmit={handleSubmit(onSubmit)}
              label='Your Address'
              placeholder='1137 Williams Avenue'
              {...register('address', {
                required: 'Address is required',

                pattern: {
                  value: /^[A-Za-z0-9\s,'-]*$/i,
                  message: 'Wrong format',
                },

                minLength: {
                  value: 5,
                  message: 'Address must have at least 5 characters',
                },
              })}
              error={errors.address?.message}
            />
          </div>

          <InputField
            handleSubmit={handleSubmit(onSubmit)}
            label='Zip Code'
            placeholder='10001'
            {...register('zipCode', {
              required: 'Zip code is required',
              pattern: {
                value: /^[0-9]*$/i,
                message: 'Wrong format',
              },
            })}
            error={errors.zipCode?.message}
          />

          <InputField
            handleSubmit={handleSubmit(onSubmit)}
            label='City'
            placeholder='New York'
            {...register('city', {
              required: 'City is required',
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: 'Wrong format',
              },
            })}
            error={errors.city?.message}
          />

          <InputField
            handleSubmit={handleSubmit(onSubmit)}
            label='Country'
            placeholder='United States'
            {...register('country', {
              required: 'Country is required',
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: 'Wrong format',
              },
            })}
            error={errors.country?.message}
          />
        </ShippingInfo>
        <Details>Payment Details</Details>

        <PaymentDetails>
          <div>
            <Label>Payment Method</Label>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <RadioInput
              label='e-Money'
              checked={paymentMethod === 'e-Money'}
              setChecked={() => setPaymentMethod('e-Money')}
              {...register('eMoneyNumber', {})}
            />

            <RadioInput
              label='Cash on Delivery'
              checked={paymentMethod === 'Cash on Delivery'}
              setChecked={() => setPaymentMethod('Cash on Delivery')}
              {...register('eMoneyNumber', {})}
            />
          </div>
        </PaymentDetails>
        <MoneyDetails>
          <InputField
            handleSubmit={handleSubmit(onSubmit)}
            label='e-Money Number'
            placeholder='238521993'
            {...register('eMoneyNumber', {
              required: 'e-Money number is required',
              pattern: {
                value: /^[0-9]*$/i,
                message: 'Wrong format',
              },
            })}
            error={errors.eMoneyNumber?.message}
          />

          <InputField
            handleSubmit={handleSubmit(onSubmit)}
            label='e-Money Pin'
            placeholder='6891'
            {...register('eMoneyPin', {
              required: 'e-Money pin is required',
              pattern: {
                value: /^[0-9]*$/i,
                message: 'Wrong format',
              },
            })}
            error={errors.eMoneyPin?.message}
          />
        </MoneyDetails>
      </Wrapper>

      <SummaryDetails
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        openModal={handleSubmit(onSubmit)}
      />

      {isModalOpen && (
        <CheckoutModal closeModal={() => setIsModalOpen(false)} />
      )}
    </CheckoutContainer>
  );
};

const CheckoutContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 106px 24px 0 24px;

  @media ${device.laptopL} {
    flex-direction: row;
    padding: 231px 165px 0 165px;
    gap: 30px;
    align-items: flex-start;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  margin-top: 24px;
  padding: 24px 24px 31px 24px;
  background: #ffffff;

  @media ${device.laptopL} {
    margin-top: 0;
  }
`;

const GoBack = styled.p`
  color: #000000;

  mix-blend-mode: normal;
  opacity: 0.5;

  cursor: pointer;

  @media ${device.laptopL} {
    position: absolute;
    top: 168px;
  }
`;

const Details = styled.p`
  font-weight: 700;
  font-size: 13px;
  line-height: 25px;
  /* identical to box height, or 192% */

  letter-spacing: 0.928571px;
  text-transform: uppercase;

  color: #d87d4a;

  margin-top: 32px;
`;

const Label = styled.label`
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.214286px;

  color: #000000;
`;

const BillingDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  gap: 24px;

  @media ${device.tablet} {
    flex-direction: row;
    flex-wrap: wrap;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ShippingInfo = styled(BillingDetails)`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  gap: 24px;

  @media ${device.tablet} {
    flex-direction: row;
    flex-wrap: wrap;

    // not first element
    & > form:not(:first-child) {
    }

    //second element
    & > form:nth-child(2) {
      width: 48%;
    }

    //third element
    & > form:nth-child(3) {
      width: 48%;
    }

    //fourth element
    & > form:nth-child(4) {
      width: 48%;
    }
  }
`;

const PaymentDetails = styled(BillingDetails)`
  gap: 16px;

  @media ${device.tablet} {
    flex-direction: row;
    /* align-items: center; */
    justify-content: space-between;
    display: flex;
  }
`;

const MoneyDetails = styled(BillingDetails)`
  margin-top: 32px;
`;

export default Checkout;
