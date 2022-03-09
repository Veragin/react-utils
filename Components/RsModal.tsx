import { Backdrop, Modal, Typography } from '@mui/material';
import { borderRadiusCss, spacingCss } from './globalCss';

import { Column } from './StyledComponents';
import React from 'react';
import styled from 'styled-components';

type Props = {
    open: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
};

export const RsModal = ({ open, onClose, children, title }: Props) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            BackdropComponent={StyledBackdrop}
            onBackdropClick={onClose}
        >
            <StyledCont>
                <StyledTitle variant="h4">{title}</StyledTitle>
                {children}
            </StyledCont>
        </Modal>
    );
};

const StyledCont = styled(Column)`
    background-color: #ffffff;
    border-radius: ${borderRadiusCss(6)};
    padding: ${spacingCss(4)} ${spacingCss(4)};
    gap: ${spacingCss(4)};
    width: 250px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const StyledTitle = styled(Typography)`
    color: black;
    width: 100%;
    text-align: center;
`;

const StyledBackdrop = styled(Backdrop)`
    &.MuiBackdrop-root {
        backdrop-filter: blur(4px);
    }
`;
