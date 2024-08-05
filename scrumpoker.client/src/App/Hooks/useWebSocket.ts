import { useCallback, useEffect, useMemo, useState } from 'react';

export type TDataMessage<TData> = {
    payload: TData;
    type: 'onNotifyConnected' | 'onNotifyChangeData' | 'onBroadcast';
}

export type TUseWebSocket<TData> = {
    pathWs: string;
    receivedMessage: TOnCallbackMessage<TData>;
}

export type TOnCallbackMessage<TData> = (message: TDataMessage<TData>) => void;

export const useWebSocket = <TData = unknown>({ pathWs, receivedMessage }: TUseWebSocket<TData>) => {
    const urlWs = useMemo(() => {
        const { host, pathname, protocol } = new URL(pathWs, 'https://localhost:5050');
        const scheme = protocol === 'https:' ? 'wss' : 'ws';
        return `${scheme}://${host}${pathname}`;
    }, [pathWs]);

    const webSocket = useMemo(() => new WebSocket(urlWs), [urlWs]);
    const [isConnected, setIsConnected] = useState(false);

    const onOpen = useCallback(() => {
        setIsConnected(true);
    }, []);

    const onClose = useCallback(() => {
        setIsConnected(false);
    }, []);

    const sendMessage = useCallback((message: TDataMessage<TData>) => {
        if (webSocket && isConnected) {
            webSocket.send(JSON.stringify(message));
        }
    }, [isConnected, webSocket]);

    const onMessage = useCallback((event: MessageEvent<TDataMessage<TData>>) => {
        receivedMessage(event.data);
    }, [receivedMessage]);

    const closeSocket = useCallback(() => {
        webSocket.close()
    }, [webSocket]);

    useEffect(() => {
        webSocket.onopen = onOpen;
        webSocket.onclose = onClose;
        webSocket.onmessage = onMessage;

        return closeSocket;
    }, [onOpen, onClose, onMessage, closeSocket, webSocket]);

    return { isConnected, sendMessage };
}
