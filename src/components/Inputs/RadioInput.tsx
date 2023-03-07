import styled from 'styled-components';

type RadioInputProps = {
  checked: boolean;
  label: string;
  setChecked?: () => void;
};

const RadioInput = ({ checked, label, setChecked }: RadioInputProps) => {
  return (
    <FormGroup>
      <RadioInputStyle checked={checked} readOnly />
      <Label>{label}</Label>
      <RadioButton checked={checked} onClick={setChecked} />
    </FormGroup>
  );
};

const FormGroup = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Label = styled.label`
  font-weight: 700;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: -0.25px;

  color: #000000;

  mix-blend-mode: normal;

  position: absolute;
  top: 18px;
  left: 52px;
`;

const RadioInputStyle = styled.input`
  width: 100%;
  padding: 18px 52px;
  border-radius: 8px;
  border: 1px solid #cfcfcf;

  &:focus {
    outline: none;
    border: 1px solid #d87d4a;
  }
`;

const RadioButton = styled.div<{ checked: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #cfcfcf;
  position: absolute;
  top: 18px;
  left: 16px;

  // if checked, change the border color

  &:after {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #d87d4a;
    position: absolute;
    // center the dot
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    // if checked, show the dot
    ${({ checked }) => (checked ? 'display: block;' : 'display: none;')}
  }
`;

export default RadioInput;
