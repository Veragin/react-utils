import { InputLabel, inputCss } from './InputCss';

import styled from 'styled-components';
import { InputTitle } from './InputTitle';

type Props<T> = {
    title: string;
    value: T;
    onChange?: (v: T) => void;
    onBlur?: () => void;
    disabled?: boolean;
    readOnly?: boolean;
    type?: 'text' | 'password' | 'number';
    helpTooltip?: string;
    min?: number;
    max?: number;
    step?: number;
};

const RsInput = <T extends string>({
    title,
    value,
    onChange,
    onBlur,
    disabled,
    readOnly,
    type,
    helpTooltip,
    min,
    max,
    step,
}: Props<T>) => {
    return (
        <InputLabel>
            <InputTitle helpTitle={helpTooltip}>{title}</InputTitle>
            <StyledInput
                value={value}
                onChange={(e) => onChange?.(e.target.value as T)}
                onBlur={onBlur}
                disabled={disabled}
                readOnly={readOnly}
                type={type}
                min={min}
                max={max}
                step={step}
            />
        </InputLabel>
    );
};

const StyledInput = styled.input`
    ${inputCss}
`;

export default RsInput;
