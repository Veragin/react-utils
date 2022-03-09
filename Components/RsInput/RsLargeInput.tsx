import { borderRadiusCss, spacingCss } from '../globalCss';

import React from 'react';
import { inputCss } from './InputCss';
import styled from 'styled-components';

type Props<T> = {
    title: string;
    value: T;
    setValue?: (v: T) => void;
    disabled?: boolean;
    readOnly?: boolean;
    type?: 'text' | 'password';
};

const RsLargeInput = <T extends string>({
    title,
    value,
    setValue,
    disabled,
    readOnly,
    type,
}: Props<T>) => {
    return (
        <StyledInput
            value={value}
            onChange={(e) => setValue?.(e.target.value as T)}
            disabled={disabled}
            readOnly={readOnly}
            type={type}
            placeholder={title}
        />
    );
};

const StyledInput = styled.input`
    ${inputCss}
    border-radius: ${borderRadiusCss(2)};
    font-size: 16px;
    padding: ${spacingCss(1)} ${spacingCss(2)};
`;

export default RsLargeInput;
