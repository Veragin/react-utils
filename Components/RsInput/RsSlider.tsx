import styled from 'styled-components';
import { InputLabel } from './InputCss';

import { InputTitle } from './InputTitle';
import { Slider, SliderProps } from '@mui/material';

type Props = {
    title: string;
    helpTitle?: string;
} & SliderProps;

export const RsSllider = ({ title, helpTitle, ...props }: Props) => {
    return (
        <InputLabel>
            <InputTitle helpTitle={helpTitle}>{title}</InputTitle>
            <StyledSlider size="small" valueLabelDisplay="auto" {...props} />
        </InputLabel>
    );
};

export const StyledSlider = styled(Slider)`
    width: calc(100% - 40px);
    margin: auto;
`;
