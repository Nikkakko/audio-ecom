import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body{
        font-family: 'Manrope', sans-serif;
        background-color: ${({ theme }) => theme.colors.white};
       
    }
    

    a{
        text-decoration: none;
        color:inherit;
    }

    h1{
        font-weight: ${({ theme }) => theme.fontWeight.bold};
        font-size: 56px;
        line-height: 58px;
        letter-spacing: 2px;
        
        text-transform: uppercase;
    }
    h2{
        font-weight: ${({ theme }) => theme.fontWeight.bold};
        font-size: 40px;
        line-height: 44px;
        letter-spacing: 1.42px;
        
        text-transform: uppercase;
    }
    h3{
        font-weight: ${({ theme }) => theme.fontWeight.bold};
        font-size: 32px;
        line-height: 36px;
        letter-spacing: 1.14px;
        
        text-transform: uppercase;
    }
    h4{
        font-weight: ${({ theme }) => theme.fontWeight.bold};
        font-size: 28px;
        line-height: 38px;
        letter-spacing: 2px;
        
        text-transform: uppercase;
    }
    h5{
        font-weight: ${({ theme }) => theme.fontWeight.bold};
        font-size: 24px;
        line-height: 33px;
        letter-spacing: 1.71px;
        
        text-transform: uppercase;
    }
    h6{
        font-weight: ${({ theme }) => theme.fontWeight.bold};
        font-size: 18px;
        line-height: 25px;
        letter-spacing: 1.28px;
        
        text-transform: uppercase;
    }

    .subtitle{
        font-weight: ${({ theme }) => theme.fontWeight.medium};
        font-size: 15px;
        line-height: 25px;
        
        mix-blend-mode: normal;
        opacity: 0.5;
    }

    p{
        font-weight: ${({ theme }) => theme.fontWeight.medium};
        font-size: 15px;
        line-height: 25px;
       
    }
    


`;
