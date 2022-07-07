import { useUser } from '../../Wrappers/UserWrapper';

import { Avatar, Typography } from '@mui/material';
import styled, { css } from 'styled-components';

import { AreYouSureModal } from '../Modals/AreYouSureModal';
import { Row } from '../StyledComponents';
import logo from 'Assets/logo/logo.svg';
import { observer } from 'mobx-react';
import { useState } from 'react';

type Props = {
    onHome: () => void;
    onUser: () => void;
    logoComp?: React.ReactNode;
    title?: React.ReactNode;
    avatarComp?: React.ReactNode;
};

export const TopBar = observer(
    ({
        onHome,
        onUser: onUserClick,
        title = null,
        logoComp = null,
        avatarComp = null,
    }: Props) => {
        const user = useUser();
        const [openModal, setOpenModal] = useState<'home' | 'user' | null>(
            null
        );

        return (
            <StyledBar>
                <StyledRow>
                    <StyledLogo
                        src={logo}
                        onClick={() => setOpenModal('home')}
                    />
                    {logoComp}
                </StyledRow>
                <StyledTitle variant="h6">{title}</StyledTitle>

                <StyledRow>
                    {avatarComp}
                    <StyledAvatar
                        onClick={() => setOpenModal('user')}
                        src={user.imageUrl}
                    />
                </StyledRow>

                <AreYouSureModal
                    open={!!openModal}
                    onClose={() => setOpenModal(null)}
                    msg={_('You will lose all current changes.')}
                    yesTitle={_('Leave')}
                    onSubmit={openModal === 'home' ? onHome : onUserClick}
                />
            </StyledBar>
        );
    }
);

const StyledLogo = styled.img`
    height: 42px;
    cursor: pointer;
`;

const StyledBar = styled(Row)`
    position: relative;
    height: 42px;
    align-items: center;
    justify-content: space-between;
    background-color: white;
    ${({ theme }) => css`
        width: calc(100% - ${theme.spacing(4)});
        padding: ${theme.spacing(1)} ${theme.spacing(2)};
        border-bottom: 2px solid ${theme.palette.input.default};
    `}
`;

const StyledRow = styled(Row)`
    align-items: center;
    column-gap: ${({ theme }) => theme.spacing(2)};
`;

const StyledTitle = styled(Typography)`
    position: absolute;
    left: 50%;
    transform: translate(-50%, 4px);
    font-size: 16px;
`;

const StyledAvatar = styled(Avatar)`
    cursor: pointer;
`;
