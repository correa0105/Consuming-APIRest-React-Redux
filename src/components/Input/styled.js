import styled from 'styled-components';
import { primaryColor } from '../../config/colors';

export const LabelContainer = styled.label`

    display: flex;
    margin-top: 20px;
    border: 1px solid #d8d8d8;

    span {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 7rem;
        background-color: ${primaryColor};
        color: #fff;
    }

    input {
        padding: 6px;
        height: 33px;
        border: none;
        flex-grow: 1;
        background-color: #eee;
    }
`;
