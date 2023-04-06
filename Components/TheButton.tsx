import styled, { css } from 'styled-components';

import { DeleteIcon } from './Icons';
import { Tooltip } from '@mui/material';
import { spacingCss } from './globalCss';

const buttonCss = (small?: boolean) => css`
    font-weight: 600;
    text-align: center;
    cursor: pointer;
    border-radius: 140px;
    padding: ${spacingCss(small ? 1 : 1.5)} ${spacingCss(small ? 1.5 : 3)};
    font-size: ${small ? '12px' : '16px'};
    white-space: nowrap;
`;

export const ThePrimaryButton = styled.button<{ $small?: boolean }>`
    ${({ theme, $small }) => css`
        ${buttonCss($small)}
        background: linear-gradient(
            200deg,
            ${theme.palette.primary.main} 7.41%,
            ${theme.palette.secondary.main} 80.94%
        );
    `}
    color: #ffffff;
    border: 0;

    &:hover {
        box-shadow: 0px 0px 24px rgb(204 68 255 / 50%);
    }
    &:disabled {
        background: lightgray;
        box-shadow: none;
    }
`;

export const TheSecondaryButton = styled.button<{ $small?: boolean }>`
    ${({ $small }) => buttonCss($small)}
    color: #c0c0c0;
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
