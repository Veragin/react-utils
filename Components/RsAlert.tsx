import React from 'react';
import { Alert } from '@mui/material';

type Props = {
    msg: string;
};

export const RsAlert = ({ msg }: Props) => {
    return <Alert severity="error">{msg}</Alert>;
};
