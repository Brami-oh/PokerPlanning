import { HubConnection } from "@microsoft/signalr";
import { TVotePokerPlanning } from "./types";

export const onUserLoggedIn = (
  instance: HubConnection,
  setMessagesList: React.Dispatch<React.SetStateAction<string[]>>
) =>
  instance.on("UserLoggedIn", (username: string) => {
    const msg = `${username} has logged in.`;
    setMessagesList((prevState) => [...prevState, msg]);
  });

export const onUserLoggedOut = (
  instance: HubConnection,
  setMessagesList: React.Dispatch<React.SetStateAction<string[]>>
) =>
  instance.on("UserLoggedOut", (username: string) => {
    const msg = `${username} has logged out.`;
    setMessagesList((prevState) => [...prevState, msg]);
  });

export const onReceiveVote = (
  instance: HubConnection,
  setMessagesList: React.Dispatch<React.SetStateAction<string[]>>
) =>
  instance.on(
    "ReceiveVote",
    ({ username, vote }: TVotePokerPlanning) => {
      const msg = `${username} voted ${vote}.`;
      setMessagesList((prevState) => [...prevState, msg]);
    }
  );
