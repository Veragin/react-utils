import { spacingCss } from "./globalCss";
import styled from "styled-components";
import { useState } from "react";
import { Button } from "@mui/material";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";

type Props<T extends string, Sortable extends T[], Data extends Record<Sortable[number], any>> = {
    data: Data[];
    CustomRow: React.FC<{ data: Data }>;
    headerNames: Record<T, string>;
    sortable: Sortable;
};

export const RsTable = <
    T extends string,
    Sortable extends T[],
    Data extends Record<Sortable[number], any>
>({
    data,
    CustomRow,
    headerNames,
    sortable,
}: Props<T, Sortable, Data>) => {
    const [sort, setSort] = useState<T | null>(null);

    const sortedData = getSortedData(data, sort);

    const columnCount = Object.keys(headerNames).length;

    return (
        <StyledTable $columnCount={columnCount}>
            <TableHeader sort={sort} setSort={setSort} headers={headerNames} sortable={sortable} />
            {sortedData.map((d, i) => (
                <CustomRow key={i} data={d} />
            ))}
        </StyledTable>
    );
};

const StyledTable = styled.div<{ $columnCount: number }>`
    width: 100%;
    row-gap: ${spacingCss(2)};
    column-gap: ${spacingCss(1)};
    display: grid;
    grid-template-columns: ${({ $columnCount }) => `repeat(${$columnCount}, 1fr)`};
    align-items: center;
`;

type HeaderProps<T extends string> = {
    sort: T | null;
    setSort: (func: (s: T | null) => T | null) => void;
    headers: Record<T, string>;
    sortable: T[];
};

const TableHeader = <T extends string>({ sort, setSort, headers, sortable }: HeaderProps<T>) => {
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
                        endIcon={sortable.includes(d) ? <FilterAltRoundedIcon /> : undefined}
                        $activeFilter={sort === d}
                    >
                        {headers[d]}
                    </StyledName>
                ) : (
                    <div key={d} />
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
            $activeFilter ? `color: ${theme.palette.primary.main};` : ""}
    }
`;

const getSortedData = <T extends string, Data extends Record<T, any>>(
    data: Data[],
    sort: T | null
) => {
    if (sort === null || data.length === 0) return data;

    const sortedData = [...data];
    const element = data[0];

    if (typeof element[sort] === "string") {
        return sortedData.sort((a: Data, b: Data): number => a[sort].localeCompare(b[sort]));
    }

    if (typeof element[sort] === "number") {
        return sortedData.sort((a: Data, b: Data): number => a[sort] - b[sort]);
    }

    if (typeof element[sort] === "boolean") {
        return sortedData.sort((a: Data, b: Data): number => Number(a[sort]) - Number(b[sort]));
    }

    return sortedData;
};
