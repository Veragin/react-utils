import { Checkbox } from '@mui/material';
import styled from 'styled-components';
import { spacingCss } from '../globalCss';

type Props = {
    title: string;
    value: boolean;
    onChange?: (v: boolean) => void;
    disabled?: boolean;
    helpTooltip?: string;
};

export const RsCheckbox = ({ title, value, onChange, disabled, helpTooltip }: Props) => {
    return (
        <InputLabel>
            <Checkbox
                checked={value}
                onChange={(e) => {
                    onChange?.(e.target.checked);
                }}
                disabled={disabled}
            />
            {title}
        </InputLabel>
    );
};

const InputLabel = styled.label`
    width: 100%;
    display: flex;
    row-gap: ${spacingCss(1)};
    align-items: center;
    font-size: 13px;
    cursor: pointer;
`;
