import styled, { css } from 'styled-components';

import React from 'react';
import SelectorPopover from './SelectorPopover';

type Props<T> = {
    element: HTMLElement | null;
    open: boolean;
    onClose: () => void;
    selectedItem?: { value: T; title: string };
    setValue: (v: T) => void;
    list: { value: T; title: string }[];
};

const SelectOptions = <T extends unknown>({
    element,
    open,
    onClose,
    selectedItem,
    setValue,
    list,
}: Props<T>) => {
    const minWidth = (element?.clientWidth ?? 50) - 16;

    const onSelect = (v: T, e: React.MouseEvent) => {
        setValue(v);
        onClose();
        e.stopPropagation();
    };

    return (
        <SelectorPopover anchor={element} onClose={onClose} open={open}>
            <StyledCont>
                {list.map((item, i) => (
                    <StyledOption
                        key={i}
                        onClick={(e) => onSelect(item.value, e)}
                        $isSelected={selectedItem?.value === item.value}
                        $minWidth={minWidth}
                    >
                        {item.title}
                    </StyledOption>
                ))}
            </StyledCont>
        </SelectorPopover>
    );
};

const StyledOption = styled.div<{ $isSelected: boolean; $minWidth: number }>`
    ${({ theme, $isSelected, $minWidth }) => css`
        min-width: ${$minWidth}px;
        background-color: ${$isSelected
            ? theme.palette.primary.second
            : 'white'};
        cursor: pointer;
        padding: ${theme.spacing(0.5)};
        border-radius: ${theme.measurements.borderRadius}px;
        font-size: ${theme.measurements.fontSize}px;

        &:hover {
            background-color: ${$isSelected
                ? theme.palette.primary.second
                : theme.palette.input.hover};
        }
    `}
`;

const StyledCont = styled.div`
    ${({ theme }) => css`
        padding: ${theme.spacing(0.5)};
    `}
`;

export default SelectOptions;
