import { InputLabel, inputCss } from "./InputCss";

import styled from "styled-components";
import { InputTitle } from "./InputTitle";

type Props<T> = {
    title: string;
    value: T;
    onChange?: (v: T) => void;
    disabled?: boolean;
    readOnly?: boolean;
    type?: "text" | "password" | "number";
    helpTooltip?: string;
};

const RsInput = <T extends string>({
    title,
    value,
    onChange,
    disabled,
    readOnly,
    type,
    helpTooltip,
}: Props<T>) => {
    return (
        <InputLabel>
            <InputTitle helpTitle={helpTooltip}>{title}</InputTitle>
            <StyledInput
                value={value}
                onChange={(e) => onChange?.(e.target.value as T)}
                disabled={disabled}
                readOnly={readOnly}
                type={type}
            />
        </InputLabel>
    );
};

const StyledInput = styled.input`
    ${inputCss}
`;

export default RsInput;
