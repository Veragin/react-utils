import { BoardPaper } from '../Patterns/BoardPaper';
import { spacingCss } from './globalCss';
import styled from 'styled-components';
import { useState } from 'react';
import { Button } from '@mui/material';
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';

type Props<T extends string, Data extends Record<T, any>> = {
    data: Data[];
    CustomRow: React.FC<{ data: Data }>;
    headerNames: Record<T, string>;
    sortable: T[];
};

export const RsTable = <T extends string, Data extends Record<T, any>>({
    data,
    CustomRow,
    headerNames,
    sortable,
}: Props<T, Data>) => {
    const [sort, setSort] = useState<T | null>(null);

    const sortedData = [...data];
    const sortFunc = getSortFunction(sort);
    if (sortFunc) {
        sortedData.sort(sortFunc);
    }

    const columnCount = Object.keys(headerNames).length;

    return (
        <BoardPaper>
            <StyledTable $columnCount={columnCount}>
                <TableHeader
                    sort={sort}
                    setSort={setSort}
                    headers={headerNames}
                    sortable={sortable}
                />
                {sortedData.map((d, i) => (
                    <CustomRow key={i} data={d} />
                ))}
            </StyledTable>
        </BoardPaper>
    );
};

const StyledTable = styled.div<{ $columnCount: number }>`
    width: 100%;
    row-gap: ${spacingCss(2)};
    display: grid;
    grid-template-columns: ${({ $columnCount }) =>
        `repeat(1fr , ${$columnCount})`};
`;

type HeaderProps<T extends string> = {
    sort: T | null;
    setSort: (func: (s: T | null) => T | null) => void;
    headers: Record<T, string>;
    sortable: T[];
};

const TableHeader = <T extends string>({
    sort,
    setSort,
    headers,
    sortable,
}: HeaderProps<T>) => {
    const data = Object.keys(headers) as T[];

    const onClick = (val: T) => {
        if (!sortable.includes(val)) return;
        setSort((prev) => (prev === val ? null : val));
    };

    return (
        <>
            {data.map((d) =>
                headers[d] ? (
                    <StyledName
                        key={d}
                        onClick={() => onClick(d)}
                        endIcon={
                            sortable.includes(d) ? (
                                <FilterAltRoundedIcon />
                            ) : undefined
                        }
                        $activeFilter={sort === d}
                    >
                        {headers[d]}
                    </StyledName>
                ) : (
                    <div />
                )
            )}
        </>
    );
};

const StyledName = styled(Button)<{ $activeFilter: boolean }>`
    color: ${({ theme }) => theme.palette.secondary.main};
    user-select: none;
    text-transform: uppercase;
    font-weight: 600;
    justify-content: start;

    & .MuiSvgIcon-root {
        ${({ theme, $activeFilter }) =>
            $activeFilter ? `color: ${theme.palette.primary.main};` : ''}
    }
`;

const getSortFunction = <T extends string, Data extends Record<T, any>>(
    sort: T | null
) => {
    if (sort === null) return;

    return (a: Data, b: Data): number => a[sort].localeCompare(b[sort]);
};
