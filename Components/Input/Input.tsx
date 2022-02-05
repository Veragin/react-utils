import { InputLabel, InputTitle, inputCss } from './InputCss';

import React from 'react';
import styled from 'styled-components';

type Props<T> = {
    title: string;
    value: T;
    setValue: (v: T) => void;
};

const Input = <T extends string>({ title, value, setValue }: Props<T>) => {
    return (
        <InputLabel>
            <InputTitle>{title}</InputTitle>
            <StyledInput
                value={value}
                onChange={(e) => setValue(e.target.value as T)}
            />
        </InputLabel>
    );
};

const StyledInput = styled.input`
    ${inputCss}
`;

export default Input;
