import { QueryClient, QueryClientProvider } from 'react-query';
import dark from 'react-utils/theme/dark';
import ThemeWrapper from './ThemeWrapper';
import { UserWrapper } from './UserWrapper';
import { SnackbarProvider } from 'notistack';

const queryClient = new QueryClient();

type Props = {
    children: React.ReactNode;
};

export const Wrappers = ({ children }: Props) => {
    return (
        <QueryClientProvider client={queryClient}>
            <SnackbarProvider>
                <ThemeWrapper theme={dark}>
                    <UserWrapper>{children}</UserWrapper>
                </ThemeWrapper>
            </SnackbarProvider>
        </QueryClientProvider>
    );
};
