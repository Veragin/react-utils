import { useState, ComponentProps, forwardRef } from 'react';
import { TextInput } from './TextInput';

type Props = Omit<
    ComponentProps<typeof TextInput>,
    'onChange' | 'value' | 'step' | 'min' | 'max'
> & {
    value: number;
    step?: number;
    min?: number;
    max?: number;
    onChange?: (v: number) => void;
};

export const NumberInput = forwardRef<HTMLInputElement, Props>(
    ({ value, onChange, onKeyPress, step, min, max, ...props }, ref) => {
        const valueToString = (v: number) =>
            String(Math.round((v + Number.EPSILON) * 100) / 100);
        const [tmpValue, setTmpValue] = useState(valueToString(value));

        const onKeyPressHandler = (
            e: React.KeyboardEvent<HTMLInputElement>
        ) => {
            onKeyPress?.(e);
            if (e.key === 'ArrowUp') {
                const n = value + (step ?? 1);
                handleChange(String(n));
            }
            if (e.key === 'ArrowDown') {
                const n = value - (step ?? 1);
                handleChange(String(n));
            }
        };

        const handleChange = (v: string) => {
            setTmpValue(v);
            const n = processValue(v);
            onChange?.(n);
        };

        const processValue = (v: string) => {
            const numbV = v
                .replace(',', '.')
                .split('')
                .filter((ch) => CHARS.includes(ch))
                .join('');
            const n = parseFloat(numbV);
            return Math.max(
                min ?? Number.NEGATIVE_INFINITY,
                Math.min(n, max ?? Number.POSITIVE_INFINITY)
            );
        };

        if (
            !Number.isNaN(value) &&
            processValue(tmpValue) !== Number(valueToString(value))
        ) {
            setTmpValue(valueToString(value));
        }

        return (
            <TextInput
                value={tmpValue}
                ref={ref}
                onChange={handleChange}
                onKeyDown={onKeyPressHandler}
                onBlur={() => setTmpValue(valueToString(value))}
                {...props}
            />
        );
    }
);

const CHARS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '-'];
