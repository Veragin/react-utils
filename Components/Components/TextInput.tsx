import { ComponentPropsWithoutRef, forwardRef } from 'react';

type Props = Omit<
    ComponentPropsWithoutRef<'input'>,
    'onChange' | 'value' | 'title'
> & {
    value: string;
    onChange?: (v: string) => void;
    onEnter?: () => void;
};

export const TextInput = forwardRef<HTMLInputElement, Props>(
    ({ onChange, onKeyDown, onEnter, value, ...props }, ref) => {
        return (
            <input
                type="text"
                ref={ref}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                onKeyDown={(e) => {
                    onKeyDown?.(e);
                    if (e.code === 'Enter') {
                        onEnter?.();
                    }
                    e.stopPropagation();
                }}
                {...props}
            />
        );
    }
);
