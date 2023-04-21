import styled, { createGlobalStyle } from 'styled-components';
import * as colors from '../config/colors';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        outline: none;
    }

    a {
       text-decoration: none; 
    }

    ul {
        list-style: none;
    }

    body {
        font-family: sans-serif;
        background-color: ${colors.backgroundColor};
    }

    button {
        cursor: pointer;
        background-color: ${colors.primaryColor};
        border: none;
        color: #fff;
        padding: 8px 20px;
        border-radius: 4px;
        font-weight: 600;
    }
`;

export const Container = styled.section`
    width: 80%;
    max-width: 600px;
    background-color: #fff;
    margin: 0 auto;
    margin-top: 25px;
    padding: 23px;
    border-radius: 5px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.4)
`;
