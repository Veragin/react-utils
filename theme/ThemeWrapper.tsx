import { ThemeProvider as MuiThemeProvider, Theme } from '@mui/material';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

import React from 'react';

const GlobalStyle = createGlobalStyle`
    .MuiButtonBase-root {
        &, &:focus {
            outline: 0;
        }
    }
`;

type WrapperProps = {
    theme: Theme;
    children: React.ReactNode;
};
const ThemeWrapper = ({ theme, children }: WrapperProps) => (
    <>
        <GlobalStyle />
        <MuiThemeProvider theme={theme}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </MuiThemeProvider>
    </>
);

export default ThemeWrapper;
