import styled from 'styled-components';

import { primaryColor } from '../../config/colors';

export const Nav = styled.nav`
    background-color: ${primaryColor};
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;

    a {
        color: #fff;
        display: flex;
        align-items: center;
        gap: .3rem
    }
`;
