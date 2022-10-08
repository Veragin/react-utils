import { InputLabel } from "./InputCss";

import { Switch } from "@mui/material";
import { InputTitle } from "./InputTitle";

type Props = {
    title: string;
    value: boolean;
    onChange?: (v: boolean) => void;
    disabled?: boolean;
    helpTooltip?: string;
};

export const RsSwitch = ({ title, value, onChange, disabled, helpTooltip }: Props) => {
    return (
        <InputLabel>
            <InputTitle helpTitle={helpTooltip}>{title}</InputTitle>
            <Switch
                value={value}
                onChange={(e) => onChange?.(e.target.value === "false")}
                disabled={disabled}
            />
        </InputLabel>
    );
};
