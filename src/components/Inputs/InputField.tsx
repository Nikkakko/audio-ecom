import styled from 'styled-components';
import React, { ComponentProps } from 'react';

type Props = ComponentProps<'input'> & {
  label?: string;
  error?: string;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
};

const InputField = (
  { label, handleSubmit, error, ...rest }: Props,
  ref: any
) => {
  return (
    <FormGroup onSubmit={handleSubmit}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 8px',
        }}
      >
        {label && <Label error={!!error}>{label}</Label>}
        {error && <Error>{error}</Error>}
      </div>
      <Input ref={ref} {...rest} error={!!error} />
    </FormGroup>
  );
};

const FormGroup = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;

  gap: 9px;
`;

const Label = styled.label`
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.214286px;
  text-transform: capitalize;
  color: ${({ error }: { error: boolean }) => (error ? '#CD2C2C' : '#000000')};
`;

const Input = styled.input`
  width: 100%;
  padding: 18px 24px;
  border-radius: 8px;
  border: ${({ error }: { error: boolean }) =>
    error ? '2px solid #CD2C2C' : '1px solid #CFCFCF'};

  &:focus {
    outline: none;
    border: 1px solid #d87d4a;
  }

  cursor: pointer;
`;

const Error = styled.p`
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  text-align: right;
  letter-spacing: -0.214286px;
  color: #cd2c2c;
`;
const ErrorBorder = styled.div``;

export default React.forwardRef(InputField);
