import styled from 'styled-components';

export const ContainerLoading = styled.div`

    
    @keyframes spinner {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.8);

    .loading-spinner {
        width: 50px;
        height: 50px;
        border: 10px solid #f3f3f3; /* Light grey */
        border-top: 10px solid #383636; /* Black */
        border-radius: 50%;
        animation: spinner 1.5s linear infinite;
}
`;
