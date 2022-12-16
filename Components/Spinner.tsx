import { Typography } from "@mui/material";
import styled from "styled-components";
import { borderRadiusCss, spacingCss } from "./globalCss";
import { Column } from "./StyledComponents";

type Props = {
    msg?: string;
};

export const Spinner = ({ msg }: Props) => {
    return (
        <StyledContainer>
            <StyledColumn>
                <StyledSpin />
                <Typography>{msg}</Typography>
            </StyledColumn>
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

const StyledColumn = styled(Column)`
    padding: ${spacingCss(2)};
    border-radius: ${borderRadiusCss(2)};
    background-color: white;
    min-width: 150px;
    max-width: 30%;
    gap: ${spacingCss(2)};

    justify-content: center;
    align-items: center;
    position: relative;
`;

const StyledSpin = styled.div`
    &,
    &:before,
    &:after {
        top: -2.5em;
        border-radius: 50%;
        width: 2.5em;
        height: 2.5em;
        animation-fill-mode: both;
        animation: load7 1.8s infinite ease-in-out;
    }
    & {
        color: ${({ theme }) => theme.palette.primary.main};
        font-size: 10px;
        position: relative;
        transform: translateZ(0);
        animation-delay: -0.16s;
    }
    &:before,
    &:after {
        content: "";
        position: absolute;
        top: 0;
    }
    &:before {
        left: -3.5em;
        -webkit-animation-delay: -0.32s;
        animation-delay: -0.32s;
    }
    &:after {
        left: 3.5em;
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
