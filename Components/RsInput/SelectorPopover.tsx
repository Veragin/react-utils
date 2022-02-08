import { borderRadiusCss, spacingCss } from 'react-utils/Components/globalCss';

import { Popover } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

type Props = {
    children: React.ReactNode;
    anchor: HTMLElement | null;
    open: boolean;
    onClose: () => void;
};

const SelectorPopover = ({ children, anchor, onClose, open }: Props) => {
    const onCloseHandler = (e: React.MouseEvent) => {
        onClose();
        e.stopPropagation();
    };

    return (
        <StyledPopover
            open={open}
            anchorEl={anchor}
            onClose={onCloseHandler}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >
            {children}
        </StyledPopover>
    );
};

const StyledPopover = styled(Popover)`
    & .MuiPopover-paper {
        padding: ${spacingCss(0.5)};
        border-radius: ${borderRadiusCss(1)};
    }
`;

export default SelectorPopover;
