import { IconButton, Tooltip } from '@mui/material';

type Props = {
    tooltip: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    children: React.ReactNode;
    color?: 'inherit' | 'primary' | 'secondary' | 'default';
};

export const RsIconButton = ({ tooltip, onClick, children, color }: Props) => (
    <Tooltip title={tooltip}>
        <IconButton onClick={onClick} color={color}>
            {children}
        </IconButton>
    </Tooltip>
);
