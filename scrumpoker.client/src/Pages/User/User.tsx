import { ChangeEvent, useState } from "react";
import { TDataMessage, TOnCallbackMessage, useWebSocket } from "../../App/Hooks/useWebSocket";
import { useData } from "./User.service";

const UserPage = () => {
    const { data, refetch } = useData();
    const [inputValue, setInputValue] = useState('');

    const handleWebSocketMessage: TOnCallbackMessage<string> = (message: TDataMessage<string>) => {
        console.log('handleWebSocketMessage', message)
        refetch();
    };

    const { sendMessage, isConnected } = useWebSocket<string>({ pathWs: '/socket', receivedMessage: handleWebSocketMessage });

    const handleSend = () => {
        if (inputValue) {
            sendMessage({ type: 'onNotifyChangeData', payload: inputValue });
            setInputValue('');
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    return (
        <div>
            <h1>Data</h1>
            {data ? (
                <pre>{JSON.stringify(data, null, 2)}</pre>
            ) : (
                <div>Loading...</div>
            )}
            <div>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Enter data to send"
                />
                <button onClick={handleSend} disabled={!isConnected}>
                    Send Data
                </button>
            </div>
        </div>
    );
}


export default UserPage;
