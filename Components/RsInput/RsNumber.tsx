import { InputLabel, inputCss } from './InputCss';

import styled from 'styled-components';
import { InputTitle } from './InputTitle';
import { useState } from 'react';

type Props = {
    title: string;
    value: number;
    onChange: (v: number) => void;
    disabled?: boolean;
    readOnly?: boolean;
    helpTitle?: string;
    min?: number;
    max?: number;
    step?: number;
};

const RsNumber = ({
    title,
    value,
    onChange,
    disabled,
    readOnly,
    helpTitle,
    min,
    max,
    step,
}: Props) => {
    const [tmpValue, setTmpValue] = useState(String(value));

    const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowUp') {
            const n = value + (step ?? 0);
            handleChange(String(n));
        }
        if (e.key === 'ArrowDown') {
            const n = value - (step ?? 0);
            handleChange(String(n));
        }
    };

    const handleChange = (v: string) => {
        setTmpValue(v);
        const n = processValue(v);
        onChange(n);
    };

    const processValue = (v: string) => {
        const numbV = v
            .replace(',', '.')
            .split('')
            .filter((ch) => chars.includes(ch))
            .join('');
        const n = parseFloat(numbV);
        return Math.max(
            min ?? Number.NEGATIVE_INFINITY,
            Math.min(n, max ?? Number.POSITIVE_INFINITY)
        );
    };

    if (processValue(tmpValue) !== value) {
        setTmpValue(String(value));
    }

    return (
        <InputLabel>
            <InputTitle helpTitle={helpTitle}>{title}</InputTitle>
            <StyledInput
                value={tmpValue}
                onChange={(e) => handleChange(e.target.value)}
                onBlur={() => setTmpValue(String(value))}
                disabled={disabled}
                readOnly={readOnly}
                onKeyDown={onKeyPress}
                type="text"
            />
        </InputLabel>
    );
};

const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '-'];

const StyledInput = styled.input`
    ${inputCss}
`;

export default RsNumber;
