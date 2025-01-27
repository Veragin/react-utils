import { Typography } from '@mui/material';
import styled from 'styled-components';

export const Column = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Row = styled.div`
    display: flex;
    flex-direction: row;
`;

export const HeadTitle = styled(Typography)`
    &.MuiTypography-root {
        width: 100%;
        text-transform: capitalize;
        font-weight: 600;
        font-size: 16px;
    }
`;

export const GreyText = styled(Typography)`
    width: 100%;
    color: #444;

    &.MuiTypography-root {
        font-size: 12px;
    }
`;
