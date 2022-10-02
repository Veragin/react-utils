import { InputLabel, InputTitle } from "./InputCss";

import { Switch } from "@mui/material";

type Props = {
    title: string;
    value: boolean;
    onChange?: (v: boolean) => void;
    disabled?: boolean;
};

export const RsSwitch = ({ title, value, onChange, disabled }: Props) => {
    return (
        <InputLabel>
            <InputTitle>{title}</InputTitle>
            <Switch
                value={value}
                onChange={(e) => onChange?.(e.target.value === "false")}
                disabled={disabled}
            />
        </InputLabel>
    );
};
