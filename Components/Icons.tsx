import { DeleteRounded, VisibilityRounded } from '@mui/icons-material';
import styled, { css } from 'styled-components';

export const VisibilityIcon = styled(VisibilityRounded)<{ $visible?: boolean }>`
    ${({ theme, $visible = true }) => css`
        &.MuiSvgIcon-root {
            cursor: pointer;
            padding: 2px;
            fill: ${$visible
                ? theme.palette.secondary.main
                : theme.palette.grey[500]};
        }
    `}
`;

export const DeleteIcon = styled(DeleteRounded)`
    ${({ theme }) => css`
        &.MuiSvgIcon-root {
            cursor: pointer;
            padding: 2px;
            fill: ${theme.palette.grey[500]};
            font-size: 1.2rem;

            &:hover {
                fill: red;
            }
        }
    `}
`;
