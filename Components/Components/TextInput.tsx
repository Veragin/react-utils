import { ComponentPropsWithoutRef, forwardRef } from 'react';

type Props = Omit<
    ComponentPropsWithoutRef<'input'>,
    'onChange' | 'value' | 'accept'
> & {
    value: string;
    onChange?: (v: string) => void;
};

export const TextInput = forwardRef<HTMLInputElement, Props>(
    ({ onChange, onKeyDown, value, ...props }, ref) => {
        return (
            <input
                type="text"
                ref={ref}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                onKeyDown={(e) => {
                    onKeyDown?.(e);
                    e.stopPropagation();
                }}
                {...props}
            />
        );
    }
);
