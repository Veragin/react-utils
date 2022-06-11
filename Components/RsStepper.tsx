import styled, { css } from 'styled-components';

import { Row } from './StyledComponents';
import { Typography } from '@mui/material';

type Props = {
    data: string[];
    step: number;
};

export const RsStepper = ({ data, step }: Props) => {
    return (
        <StyledCont>
            <SteperHolder>
                {data.map((d, i) => (
                    <Step
                        key={i}
                        state={
                            i < step ? 'prev' : i === step ? 'active' : 'next'
                        }
                        hasPipe={i !== 0}
                    />
                ))}
            </SteperHolder>
            <StyledTitle>{data[step] ?? `unknown`}</StyledTitle>
        </StyledCont>
    );
};

type TStepState = 'prev' | 'active' | 'next';

const Step = ({ state, hasPipe }: { state: TStepState; hasPipe: boolean }) => {
    return (
        <>
            {hasPipe && <StepPipe $state={state} />}
            <StepCore $state={state} />
        </>
    );
};

const StyledCont = styled(Row)`
    align-items: center;
    ${({ theme }) => css`
        column-gap: ${theme.spacing(2)};
        width: 100%;
        height: 24px;
    `}
`;

const SteperHolder = styled(Row)`
    align-items: center;
`;

const StepCore = styled.div<{ $state: TStepState }>`
    border-radius: 50%;
    background-color: ${({ theme, $state }) =>
        $state === 'next'
            ? theme.palette.grey[200]
            : $state === 'active'
            ? theme.palette.primary.main
            : theme.palette.primary.light};
    width: 24px;
    height: 24px;
`;
const StepPipe = styled.div<{ $state: TStepState }>`
    background-color: ${({ theme, $state }) =>
        $state === 'next'
            ? theme.palette.grey[200]
            : theme.palette.primary.light};
    width: 6px;
    height: 6px;
`;

const StyledTitle = styled(Typography)`
    &.MuiTypography-root {
        text-align: center;
        font-size: 16px;
        font-weight: 400;
    }
`;
