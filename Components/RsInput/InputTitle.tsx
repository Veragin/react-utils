import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import { Tooltip } from "@mui/material";
import styled from "styled-components";
import { spacingCss } from "../globalCss";
import { Row } from "../StyledComponents";

type Props = {
    className?: string;
    helpTitle?: string;
    children: string;
};

export const InputTitle = ({ className, helpTitle, children }: Props) => {
    return (
        <StyledRow>
            <StyledInputTitle className={className}>{children}</StyledInputTitle>
            {helpTitle !== undefined && (
                <Tooltip title={helpTitle}>
                    <StyledIcon />
                </Tooltip>
            )}
        </StyledRow>
    );
};

const StyledInputTitle = styled.span`
    user-select: none;
    text-transform: uppercase;
    font-weight: 600;
`;

const StyledRow = styled(Row)`
    color: ${({ theme }) => theme.palette.secondary.main};
    font-size: 10px;
    gap: ${spacingCss(0.5)};
    align-items: center;
`;

const StyledIcon = styled(HelpRoundedIcon)`
    width: 12px;
    height: 12px;
`;
