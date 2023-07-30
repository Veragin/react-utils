import { useState } from 'react';
import RsInput from '../RsInput/RsInput';

type Props = Omit<
    React.ComponentProps<typeof RsInput>,
    'value' | 'onChange'
> & {
    value: number[];
    onChange?: (v: number[]) => void;
};

export const RsNumberArrayInput = ({ value, onChange, ...props }: Props) => {
    const [tmpValue, setTmpValue] = useState(value.join(', '));

    const handleChange = (v: string) => {
        setTmpValue(v);
        const n = processValue(v);
        console.log(n);
        onChange?.(n);
    };

    const processValue = (v: string) => {
        const value = v
            .split(',')
            .map((s) => s.trim())
            .filter((s) => s !== '')
            .map((s) => Number(s))
            .filter((n) => !Number.isNaN(n));
        return value;
    };

    const processed = processValue(tmpValue);
    if (
        processed.length !== value.length ||
        processed.some((v, i) => v !== value[i])
    ) {
        setTmpValue(String(value));
    }

    return (
        <RsInput
            {...props}
            value={tmpValue}
            onChange={handleChange}
            onBlur={() => setTmpValue((old) => processValue(old).join(', '))}
        />
    );
};
