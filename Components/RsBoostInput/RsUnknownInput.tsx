import { RsInput } from '../RsInput/RsInput';

const UNKOWN = 'unknown';

type Props = Omit<
    React.ComponentProps<typeof RsInput>,
    'value' | 'onChange'
> & {
    value?: string | null;
    onChange?: (v: string | null) => void;
};

export const RsUnkownInput = ({ value, onChange, ...props }: Props) => {
    return (
        <RsInput
            {...props}
            value={value ?? UNKOWN}
            onChange={(s) => onChange?.(s === UNKOWN ? null : s)}
        />
    );
};
