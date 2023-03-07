import React, { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import { IconArrowRight } from '../../svgs';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  bgColor?: string;
  color?: string;
  icon?: boolean;
  border?: string;
  hoverColor?: string;
}

const Button: React.FC<ButtonProps> = ({
  text,
  color,
  onClick,
  bgColor,
  icon,
  border,
  hoverColor,
}) => {
  return (
    <ButtonStyle
      onClick={onClick}
      style={{
        backgroundColor: bgColor,
        color: color,
        border: border,
        transition: 'all 0.3s ease',
      }}
      hoverColor={hoverColor}
      icon={icon}
    >
      {text}
      {icon && <IconArrowRight />}
    </ButtonStyle>
  );
};

const ButtonStyle = styled.button<{
  hoverColor?: string;
  icon?: boolean;
}>`
  padding: 15px 30px;
  border: none;
  text-transform: uppercase;

  font-weight: 700;
  font-size: 13px;
  line-height: 18px;
  /* identical to box height */

  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    margin-left: 13px;
  }

  &:hover {
    background-color: ${({ hoverColor }) => hoverColor} !important;
    color: ${({ icon, hoverColor }) =>
      icon ? '#D87D4A' : hoverColor === '#000000' ? 'white' : null} !important;
  }
`;

export default Button;
