import { Theme } from '@mui/material';

export const spacingCss =
    (size: number) =>
    ({ theme }: { theme: Theme }) =>
        theme.spacing(size);

export const borderRadiusCss =
    (size: number) =>
    ({ theme }: { theme: Theme }) =>
        theme.measurements.borderRadius * size + 'px';
