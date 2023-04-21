import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StudentContainer = styled.div`
    margin-top: 25px;

    table {
        width: 100%;
        border-color: red;
        border-collapse: collapse;

        tr + tr{
            border-top: 1px solid #eee;
        }

        tr {
            height: 65px;
        }
    }
`;

export const ProfilePicture = styled.div`
    display: flex;
    align-items: center;
    gap: 9px;

        img {
            width: 55px;
            height: 55px;
            object-fit: cover;
            object-position: 0 -5px;
            border-radius: 50%;
    }
`;

export const RegisterStudent = styled(Link)`
    
`;
