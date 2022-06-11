import { useRef, useState } from 'react';

import { Button } from '@mui/material';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import SelectOptions from './SelectOptions';
import styled from 'styled-components';

type Props<T> = {
    value: T;
    setValue: (v: T) => void;
    list: { value: T; title: string }[];
};

const Selector = <T extends string>({ value, setValue, list }: Props<T>) => {
    const [open, setOpen] = useState(false);
    const anchor = useRef<HTMLButtonElement>(null);

    const selectedItem = list.find((item) => item.value === value);

    const onOpen = (e: React.MouseEvent) => {
        setOpen(true);
        e.stopPropagation();
    };

    return (
        <>
            <StyledButton
                onClick={onOpen}
                ref={anchor}
                endIcon={<StyledArrow />}
            >
                {selectedItem?.title ?? _('Choose one')}
            </StyledButton>
            <SelectOptions
                element={anchor.current}
                onClose={() => setOpen(false)}
                open={open}
                list={list}
                selectedItem={selectedItem}
                setValue={setValue}
            />
        </>
    );
};

const StyledButton = styled(Button)`
    &.MuiButton-root {
        width: 100%;
        justify-content: space-between;
        color: black;
    }
`;

const StyledArrow = styled(KeyboardArrowDownRoundedIcon)`
    &.MuiSvgIcon-root {
        font-size: 1.2rem;
    }
`;

export default Selector;
