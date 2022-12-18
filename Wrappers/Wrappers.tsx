import { QueryClient, QueryClientProvider } from "react-query";
import dark from "react-utils/theme/dark";
import ThemeWrapper from "./ThemeWrapper";
import { UserWrapper } from "./UserWrapper";

const queryClient = new QueryClient();

type Props = {
    children: React.ReactNode;
};

export const Wrappers = ({ children }: Props) => {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeWrapper theme={dark}>
                <UserWrapper>{children}</UserWrapper>
            </ThemeWrapper>
        </QueryClientProvider>
    );
};
