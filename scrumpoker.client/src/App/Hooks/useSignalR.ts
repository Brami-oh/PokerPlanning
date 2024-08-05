import { HubConnection, HubConnectionBuilder, HubConnectionState, IRetryPolicy, JsonHubProtocol, LogLevel } from "@microsoft/signalr";
import { useCallback, useEffect, useMemo, useState } from 'react';

export type callbackMethodName<TRequest = never, TResponse = void> = (...args: TRequest[]) => TResponse;

export type TOnMethodName<TRequest = never, TResponse = void> =
    (methodName: string, newMethod: callbackMethodName<TRequest, TResponse>) => void;

type TUseSignalR = {
    urlHub: string;
    onEventSubscribe?: (instance: HubConnection) => void;
}

const useSignalR = ({ urlHub, onEventSubscribe }: TUseSignalR) => {
    const [isConnected, setIsConnected] = useState(false);

    const instance = useMemo(() => {
        const reconnectPolicy: IRetryPolicy = {
            nextRetryDelayInMilliseconds: (retryContext) => {
                return retryContext.elapsedMilliseconds * retryContext.previousRetryCount;
            }
        }

        const instance = new HubConnectionBuilder()
            .withUrl(urlHub, {
                headers: {
                    'Accept': '*/*',
                    'Access-Control-Allow-Origin': '*'
                },
                withCredentials: false
            })
            .withAutomaticReconnect(reconnectPolicy)
            .withHubProtocol(new JsonHubProtocol())
            .configureLogging(LogLevel.Information)
            .build();

        onEventSubscribe && onEventSubscribe(instance)

        return instance;
    }, [urlHub, onEventSubscribe]);

    const canStart = useMemo(() => {
        return instance.state === HubConnectionState.Disconnected;
    }, [instance.state]);

    const closeSocket = useCallback(() => {
        isConnected &&  instance.stop()
    }, [instance, isConnected]);

    const onStart = useCallback(async () => {
        try {
            canStart && await instance.start();
        } catch (err) {
            setTimeout(async () => await onStart(), 5000);
        }

        setIsConnected(instance.state === HubConnectionState.Connected)
    }, [instance, canStart]);

    const sendMessage = useCallback(<TData = unknown>(methodName: string, data: TData) => {
        if (instance && isConnected) {
            instance.send(methodName, data);
        }
    }, [instance, isConnected]);

    useEffect(() => {
        onStart();

        return closeSocket;
    }, [canStart, onStart, closeSocket]);

    return { isConnected, sendMessage };
}

export default useSignalR;