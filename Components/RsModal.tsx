import { Backdrop, Modal } from '@mui/material';
import styled, { css } from 'styled-components';

import { Column } from './StyledComponents';
import React from 'react';

type Props = {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

export const RsModal = ({ open, onClose, children }: Props) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            BackdropComponent={StyledBackdrop}
            onBackdropClick={onClose}
        >
            <StyledCont>{children}</StyledCont>
        </Modal>
    );
};

const StyledCont = styled(Column)`
    background-color: #ffffff;
    ${({ theme }) => css`
        border-radius: 3 * ${theme.measurement.borderRadius}px;
    `}
`;

const StyledBackdrop = styled(Backdrop)`
    &.MuiBackdrop-root {
        backdrop-filter: blur(4px);
    }
`;
