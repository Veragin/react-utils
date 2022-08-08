import styled from 'styled-components';

export const Spinner = () => {
    return (
        <StyledContainer>
            <StyledBox>
                <StyledSpin />
            </StyledBox>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
`;

const StyledBox = styled.div``;

const StyledSpin = styled.div`
    &,
    &:after,
    &:before {
        border-radius: 50%;
        width: 2em;
        height: 2em;
        animation-fill-mode: both;
        animation: load7 1.8s infinite ease-in-out;
    }

    color: ${({ theme }) => theme.palette.primary.main};
    font-size: 10px;
    margin: 80px auto;
    position: relative;
    text-indent: -9999em;
    transform: translateZ(0);
    animation-delay: -0.16s;

    &:before,
    &:after {
        content: '';
        position: absolute;
        top: 0;
    }
    &:before {
        left: -3em;
        animation-delay: -0.32s;
    }
    &:after {
        left: 3em;
    }
    @keyframes load7 {
        0%,
        80%,
        100% {
            box-shadow: 0 2.5em 0 -1.3em;
        }
        40% {
            box-shadow: 0 2.5em 0 0;
        }
    }
`;
