import { InputLabel } from './InputCss';

import { Checkbox } from '@mui/material';
import { InputTitle } from './InputTitle';

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
            <InputTitle helpTitle={helpTooltip}>{title}</InputTitle>
            <Checkbox
                checked={value}
                onChange={(e) => {
                    onChange?.(e.target.checked);
                }}
                disabled={disabled}
            />
        </InputLabel>
    );
};
