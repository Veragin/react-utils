import { InputLabel, inputCss } from './InputCss';

import styled from 'styled-components';
import { InputTitle } from './InputTitle';
import { ComponentPropsWithoutRef } from 'react';
import { NumberInput } from '../Components/NumberInput';

type Props = {
    title: string;
    helpTitle?: string;
} & ComponentPropsWithoutRef<typeof NumberInput>;

export const RsNumber = ({ title, helpTitle, ...props }: Props) => {
    return (
        <InputLabel>
            <InputTitle helpTitle={helpTitle}>{title}</InputTitle>
            <StyledInput {...props} />
        </InputLabel>
    );
};

const StyledInput = styled(NumberInput)`
    ${inputCss}
`;
