import styled from 'styled-components';
import * as color from '../../config/colors';

export const Form = styled.form`
    label {
        margin: 0 auto;
        margin-top: 1.5rem;
        width: 130px;
        height: 130px;
        background-color: #bbb;
        border: 2px solid ${color.primaryColor};
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        cursor: pointer;
    }

    img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: 0 -5px;
            border-radius: 50%;
    }

    input {
        display: none;
    }

    button {
        margin-top: 25px;
        width: 100%;
    }
`;
