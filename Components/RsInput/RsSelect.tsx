import { InputLabel, InputTitle, inputCss } from './InputCss';
import { useRef, useState } from 'react';

import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { Row } from '../StyledComponents';
import SelectOptions from './SelectOptions';
import styled from 'styled-components';

type Props<T> = {
    title: string;
    value: T;
    setValue: (v: T) => void;
    readonly list: { readonly value: T; readonly title: string }[];
};

const Select = <T extends unknown>({
    title,
    value,
    setValue,
    list,
}: Props<T>) => {
    const [open, setOpen] = useState(false);
    const anchor = useRef<HTMLDivElement>(null);

    const selectedItem = list.find((item) => item.value === value);

    const onOpen = (e: React.MouseEvent) => {
        setOpen(true);
        e.stopPropagation();
    };

    return (
        <InputLabel onClick={onOpen}>
            <InputTitle>{title}</InputTitle>
            <StyledSelect ref={anchor} $isFocused={open}>
                {selectedItem?.title ?? _('Choose one')}
                <StyledArrow />
            </StyledSelect>
            <SelectOptions
                element={anchor.current}
                onClose={() => setOpen(false)}
                open={open}
                list={list}
                selectedItem={selectedItem}
                setValue={setValue}
            />
        </InputLabel>
    );
};

const StyledSelect = styled(Row)<{ $isFocused: boolean }>`
    ${inputCss}
    text-indent: 0;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    ${({ theme, $isFocused }) =>
        $isFocused
            ? `
            border: 2px solid ${theme.palette.primary.main};
            background-color: ${theme.palette.input.hover};
        `
            : ''}
`;

const StyledArrow = styled(KeyboardArrowDownRoundedIcon)`
    &.MuiSvgIcon-root {
        font-size: 1.2rem;
    }
`;

export default Select;
