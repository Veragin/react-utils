import { IconButton, Tooltip } from '@mui/material';

import React from 'react';

type Props = {
    tooltip: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    children: React.ReactNode;
};

export const RsIconButton = ({ tooltip, onClick, children }: Props) => (
    <Tooltip title={tooltip}>
        <IconButton onClick={onClick}>{children}</IconButton>
    </Tooltip>
);
