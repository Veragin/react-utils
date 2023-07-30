import RsInput from '../RsInput/RsInput';

const UNKOWN = 'unknown';

type Props<T extends string> = Omit<
    React.ComponentProps<typeof RsInput>,
    'value'
> & {
    value?: T | null;
    onChange?: (v: T | null) => void;
};

export const RsUnkownInput = <T extends string>({
    value,
    onChange,
    ...props
}: Props<T>) => {
    return (
        <RsInput
            {...props}
            value={value ?? UNKOWN}
            onChange={(s) => onChange?.(s === UNKOWN ? null : s)}
        />
    );
};
