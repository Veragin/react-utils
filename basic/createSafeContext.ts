import { Context, createContext, useContext } from 'react';

import { assertNotNullish } from './typeguards';

const useSafeContext = <T>(context: Context<T | null>) => {
    const contextValue = useContext(context);

    assertNotNullish(contextValue, `Context '${context.displayName ?? 'Unknown Context'}' is not provided.`);

    return contextValue;
};

export const createSafeContext = <T>(displayName: string) => {
    const context = createContext<T | null>(null);
    context.displayName = displayName;

    const useContext = () => useSafeContext(context);

    return [context, useContext] as const;
};
