import { Alert } from '@mui/material';
import styled from 'styled-components';

export type TAlert = {
    msg: string;
    severity?: 'error' | 'warning' | 'info' | 'success';
} | null;

type Props = {
    alert: TAlert;
    onClose?: () => void;
};

export const RsAlert = ({ alert, onClose }: Props) => {
    if (alert === null) return null;

    return (
        <StyledAlert severity={alert.severity ?? 'error'} onClose={onClose}>
            {alert.msg}
        </StyledAlert>
    );
};

const StyledAlert = styled(Alert)`
    width: 100%;
    box-sizing: border-box;
`;
