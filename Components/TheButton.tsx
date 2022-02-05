import styled, { css } from 'styled-components';

import { DeleteIcon } from './Icons';
import React from 'react';
import { Tooltip } from '@mui/material';

const buttonCss = css`
    font-weight: 600;
    font-size: 16px;
    text-align: center;
    cursor: pointer;
    border-radius: 140px;
`;

export const ThePrimaryButton = styled.button`
    ${buttonCss}
    color: #ffffff;
    ${({ theme }) => css`
        padding: ${theme.spacing(1.5)} ${theme.spacing(3)};
        background: linear-gradient(
            200deg,
            ${theme.palette.primary.main} 7.41%,
            ${theme.palette.secondary.main} 80.94%
        );
    `}
    border: 0;

    &:hover {
        box-shadow: 0px 0px 24px rgb(204 68 255 / 50%);
    }
`;

export const TheSecondaryButton = styled.button`
    ${buttonCss}
    color: #c0c0c0;
    padding: ${({ theme }) => `${theme.spacing(1.5)} ${theme.spacing(3)}`};
    background: transparent;
    border: 2px solid #c0c0c0;

    &:hover {
        box-shadow: 0px 0px 24px rgb(100 100 100 / 20%);
    }
`;

/**********************************
 ****   DeleteButton
 **********************************/

export const DeleteButton = (props: { onClick: () => void }) => {
    const onDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        props.onClick();
    };

    return (
        <Tooltip title={_('Delete')}>
            <DeleteIcon onClick={onDelete} />
        </Tooltip>
    );
};
