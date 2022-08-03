import {
    ThePrimaryButton,
    TheSecondaryButton,
} from "../../Components/TheButton";

import { Row } from "../../Components/StyledComponents";
import { RsModal } from "../../Components/RsModal";
import { Typography } from "@mui/material";
import styled from "styled-components";

type Props = {
    open: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    msg: string;
    yesTitle?: string;
    noTitle?: string;
};

export const AreYouSureModal = ({
    open,
    onClose,
    onSubmit,
    title,
    msg,
    yesTitle,
    noTitle,
}: Props) => {
    return (
        <RsModal open={open} title={title ?? _("Warning")} onClose={onClose}>
            <StyledMsg>{msg}</StyledMsg>
            <StyledRow>
                <TheSecondaryButton onClick={onClose}>
                    {noTitle ?? _("Close")}
                </TheSecondaryButton>
                <ThePrimaryButton
                    onClick={() => {
                        onSubmit();
                        onClose();
                    }}
                >
                    {yesTitle ?? _("Yes")}
                </ThePrimaryButton>
            </StyledRow>
        </RsModal>
    );
};

const StyledRow = styled(Row)`
    align-items: center;
    justify-content: space-between;
`;

const StyledMsg = styled(Typography)`
    width: 100%;
    height: 100%;
    overflow: hidden;
`;
