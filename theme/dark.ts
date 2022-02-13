import { createTheme } from '@mui/material';
const theme = createTheme({
    typography: {
        button: {
            textTransform: 'none',
        },
        htmlFontSize: 14,
        caption: {
            fontSize: 20,
        },
        fontFamily: ['Roboto'].join(','),
    },
    palette: {
        primary: {
            main: '#CC44FF',
            light: '#ffd1f9',
        },
        secondary: {
            main: '#4457FF',
            light: '#DADDFF',
        },
        error: {
            main: '#f44336',
            light: '#FFB3B3',
            dark: '#FF0000',
        },
        success: {
            main: '#4caf50',
            light: '#A6FFA6',
            dark: '#00FF00',
        },
        input: {
            selected: '#dbcaff',
            hover: '#f5f5f5',
            default: '#eaeaea',
            border: '#BC3CD0',
        },
        backgr: {
            default: 'rgb(244, 248, 255)',
        },
    },
    measurements: {
        width: 1,
        borderRadius: 6,
        fontSize: 12,
    },
});
export default theme;
