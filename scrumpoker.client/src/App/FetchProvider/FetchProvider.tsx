import { createContext, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const showReactQueryDevtools = (isDevelopment: boolean) =>
    isDevelopment && <ReactQueryDevtools initialIsOpen={false} buttonPosition={"bottom-right"} />

export type TFetchContext = {
    fetchCustom: <T>(params: unknown[] | { path: string, customConfig: object }) => Promise<T> | null;
    queryClient: QueryClient;
}

export const FetchContext = createContext<TFetchContext | object>({});
FetchContext.displayName = 'FetchContext';

export type TFetchProvider = {
    children: ReactNode;
    fetchCustomFn?: TFetchContext
};

export const FetchProvider = ({ children }: TFetchProvider) => {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            {showReactQueryDevtools(import.meta.env.DEV)}
        </QueryClientProvider>
    );
}

export default FetchProvider;