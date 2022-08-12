import { Column, Row } from 'react-utils/Components/StyledComponents';

import { observer } from 'mobx-react';
import styled from 'styled-components';
import { ReactElement } from 'react';
import { TopBar } from 'react-utils/Patterns/TopBar';
import { Tab, Tabs } from '@mui/material';
import { spacingCss } from 'react-utils/Components/globalCss';

export type TOption<T> = {
    label: string;
    value: T;
    content: ReactElement;
};

type Props<T> = {
    selected: T;
    onChange: (value: T) => void;
    options: TOption<T>[];
};

type MenuBoardProps<T> = Props<T> & {
    title: string;
    onUser: () => void;
    onHome: () => void;
};

export const MenuBoard = observer(
    <T extends string>({
        onHome,
        onUser,
        title,
        ...props
    }: MenuBoardProps<T>) => {
        return (
            <StyledColumn>
                <TopBar onHome={onHome} onUser={onUser} title={title} />
                <StyledRow>
                    <Menu {...props} />
                    <Board {...props} />
                </StyledRow>
            </StyledColumn>
        );
    }
);

const StyledColumn = styled(Column)`
    height: 100%;
    width: 100%;
`;

const StyledRow = styled(Row)`
    height: 100%;
    width: 100%;
    overflow: hidden;
`;

const Menu = <T extends string>({ selected, options, onChange }: Props<T>) => {
    return (
        <StyledTabs
            orientation="vertical"
            variant="scrollable"
            value={selected}
            onChange={(e, v) => onChange(v)}
            sx={{ borderRight: 1, borderColor: 'divider' }}
            color="secondary"
        >
            {options.map((item, i) => (
                <Tab label={item.label} value={item.value} key={i} />
            ))}
        </StyledTabs>
    );
};

const StyledTabs = styled(Tabs)`
    width: 250px;
    height: 100%;
`;

const Board = <T extends string>({ selected, options }: Props<T>) => {
    const selectedContent =
        options.find((item) => item.value === selected)?.content ?? null;

    return (
        <StyledCont>
            <StyledBoard>{selectedContent}</StyledBoard>
        </StyledCont>
    );
};

const StyledCont = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: ${({ theme }) => theme.palette.backgr.default};
`;

const StyledBoard = styled(Column)`
    width: calc(100% - ${spacingCss(6)});
    padding: ${spacingCss(3)};
    gap: ${spacingCss(3)};
    background: transparent;
    height: calc(100% - ${spacingCss(6)});
    overflow: auto;
`;
