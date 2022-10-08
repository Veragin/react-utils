import styled from "styled-components";
import { Button } from "@mui/material";
import { Row } from "../StyledComponents";
import { spacingCss } from "../globalCss";

type Props = {
    title: string;
    onChange: (v: FileList | null) => void;
    disabled?: boolean;
    accept: string;
    multiple?: boolean;
    selectedCount: number;
};

export const RsFile = ({ title, onChange, disabled, selectedCount, multiple, accept }: Props) => {
    const fileString = selectedCount === 1 ? _("1 file") : _("%d files", selectedCount);

    return (
        <StyledRow>
            <Button variant="contained" component="label" disabled={disabled}>
                {title}
                <input
                    hidden
                    accept={accept}
                    multiple={multiple}
                    type="file"
                    onChange={(e) => onChange(e.target.files)}
                />
            </Button>
            {`${_("Choosed")} ${fileString}`}
        </StyledRow>
    );
};

const StyledRow = styled(Row)`
    gap: ${spacingCss(1)};
    align-items: center;
`;
