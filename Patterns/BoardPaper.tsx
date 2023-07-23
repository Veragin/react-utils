import { Column, Row } from 'react-utils/Components/StyledComponents';

import { spacingCss } from 'react-utils/Components/globalCss';
import styled from 'styled-components';

type Props = {
    title?: string;
    children: React.ReactNode;
};

export const BoardPaper = ({ title, children }: Props) => {
    return (
        <StyledCont>
            {title && <StyledTitle>{title}</StyledTitle>}
            <StyledPaper>{children}</StyledPaper>
        </StyledCont>
    );
};

const StyledCont = styled(Column)`
    position: relative;
    width: calc(100% - ${spacingCss(6)});
    padding: ${spacingCss(3)};
    background-color: white;
    row-gap: ${spacingCss(3)};
`;

const StyledTitle = styled.span`
    color: ${({ theme }) => theme.palette.secondary.main};
    font-weight: 600;
    font-size: 14px;
    text-transform: uppercase;
`;

const StyledPaper = styled(Row)`
    column-gap: ${spacingCss(3)};
`;
