import { HelperText, InputLabel, inputCss } from './InputCss';

import styled from 'styled-components';
import { InputTitle } from './InputTitle';
import { TextInput } from '../Components/TextInput';
import { ComponentPropsWithoutRef } from 'react';

type Props = {
    title: string;
    helpTooltip?: string;
    helperText?: string;
} & ComponentPropsWithoutRef<typeof TextInput>;

export const RsInput = ({
    title,
    helpTooltip,
    helperText,
    ...props
}: Props) => {
    return (
        <InputLabel>
            <InputTitle helpTitle={helpTooltip}>{title}</InputTitle>
            <StyledInput {...props} />
            {helperText && <HelperText>{helperText}</HelperText>}
        </InputLabel>
    );
};

const StyledInput = styled(TextInput)`
    ${inputCss}
`;
