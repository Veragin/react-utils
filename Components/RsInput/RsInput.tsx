import { InputLabel, inputCss } from './InputCss';

import styled from 'styled-components';
import { InputTitle } from './InputTitle';
import { TextInput } from '../Components/TextInput';
import { ComponentProps } from 'react';

type Props = {
    title: string;
    helpTooltip?: string;
} & ComponentProps<typeof TextInput>;

export const RsInput = ({ title, helpTooltip, ...props }: Props) => {
    return (
        <InputLabel>
            <InputTitle helpTitle={helpTooltip}>{title}</InputTitle>
            <StyledInput {...props} />
        </InputLabel>
    );
};

const StyledInput = styled(TextInput)`
    ${inputCss}
`;
