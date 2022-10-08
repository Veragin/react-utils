import styled, { css } from "styled-components";

import { spacingCss } from "../globalCss";

export const inputCss = css`
    ${({ theme }) => css`
        background-color: ${theme.palette.input.default};
        border: 2px solid ${theme.palette.input.default};
        border-radius: ${theme.measurements.borderRadius}px;
        padding: ${theme.spacing(0.5)} ${theme.spacing(1)};
        width: 100%;
        outline: none;
        font-weight: 400;
        line-height: 1.75;
        box-sizing: border-box;
        font-size: ${theme.measurements.fontSize}px;

        &:hover {
            background-color: ${theme.palette.input.hover};
            border: 2px solid ${theme.palette.input.hover};
        }

        &:focus {
            border: 2px solid ${theme.palette.primary.main};
            background-color: ${theme.palette.input.hover};
        }

        &:disabled {
            background-color: ${theme.palette.input.hover};
            border: 2px solid ${theme.palette.input.hover};
            color: grey;
        }
    `}
`;

export const InputLabel = styled.label`
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: ${spacingCss(0.5)};
`;

export const InputTitle = styled.span`
    color: ${({ theme }) => theme.palette.secondary.main};
    user-select: none;
    font-size: 10px;
    text-transform: uppercase;
    font-weight: 600;
`;
