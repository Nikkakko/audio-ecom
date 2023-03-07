import { createBrowserHistory, useNavigate } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';
import { useAppSelector } from '../app/hooks';
import { InputField, RadioInput } from '../components';
import Modal from '../components/Modals/CartModal';
import CheckoutModal from '../components/Modals/CheckoutModal';
import SummaryDetails from '../components/SummaryDetails';
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
  const [InputValue, setInputValue] = useState({
    firstName: '',
    email: '',
    phoneNumber: '',
    address: '',
    zipCode: '',
    city: '',
    country: '',
    eMoneyNumber: '',
    eMoneyPin: '',
  });

  const { cartItems } = useAppSelector(state => state.product);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputProps>();

  const [paymentMethod, setPaymentMethod] = useState('e-Money');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

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
      <GoBack onClick={useGoBack}>Go Back</GoBack>
      <Wrapper>
        <h4>Checkout</h4>

        <Details>Billing Details</Details>

        <BillingDetails>
          <InputField
            handleSubmit={handleSubmit(onSubmit)}
            label='Name'
            {...register('firstName')}
            placeholder='Alexei'
            error={errors.firstName?.message}
            {...register('firstName', {
              required: 'Name is required',
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: 'Wrong format',
              },
            })}
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
        </ShippingInfo>
        <Details>Payment Details</Details>

        <PaymentDetails>
          <Label>Payment Method</Label>
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
  display: flex;
  flex-direction: column;
  padding: 106px 24px 0 24px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  margin-top: 24px;
  padding: 24px 24px 31px 24px;
  background: #ffffff;
`;

const GoBack = styled.p`
  color: #000000;

  mix-blend-mode: normal;
  opacity: 0.5;
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
`;

const ShippingInfo = styled(BillingDetails)`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  gap: 24px;
`;

const PaymentDetails = styled(BillingDetails)`
  gap: 16px;
`;

const MoneyDetails = styled(BillingDetails)`
  margin-top: 32px;
`;

export default Checkout;
