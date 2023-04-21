import styled from 'styled-components';

export const Form = styled.form`
    button {
        margin-top: 25px;
        width: 100%;
    }
`;

export const ProfilePicture = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    margin-top: 1rem;


    span {
        position: relative;

        img {
            width: 105px;
            height: 105px;
            object-fit: cover;
            object-position: 0 -5px;
            border-radius: 50%;
            border: 1px solid black;
        }

        a {
            position: absolute;
            background-color: #3FB8AF;
            bottom: 0;
            right: 10px;
            padding: 5px 5px 4px 8px;
            border-radius: 50%;
        }
    }
        
`;
