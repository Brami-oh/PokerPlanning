import { useState } from "react";
import useSignalR from "../../App/Hooks/useSignalR";
import {
  onReceiveVote,
  onUserLoggedIn,
  onUserLoggedOut,
} from "./PokerPlanning.helpers";
// import { Controller, useFormContext } from "react-hook-form";

const PokerPlanningPage = () => {
//   const { control } = useFormContext();

  const [userConnected, setUserConnected] = useState<string[]>([]);
  const [voteList, setVoteList] = useState<string[]>([]);

  const [username, setUsername] = useState<string>('');
  const [vote, setVote] = useState<number>(0);

  const { sendMessage, isConnected } = useSignalR({
    urlHub: "https://localhost:5050/pokerPlanningHub",
    onEventSubscribe: (instance) => {
      onUserLoggedIn(instance, setUserConnected);
      onUserLoggedOut(instance, setUserConnected);
      onReceiveVote(instance, setVoteList);
    },
  });

  function login() {
    sendMessage("loginUser", username);
  }

  function logout() {
    sendMessage("logoutUser", username);
  }

  function submitVote() {
    sendMessage("Vote", { username, vote });
  }

  return (
    <div>
      <h1>Poker Planning</h1>
      <div>
        {/* <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <input {...field} type="text" placeholder="Enter username" />
          )}
        /> */}
        <input type="text" id="username" onChange={(e)=> setUsername(e.target.value)} placeholder="Enter username" />
        <button onClick={login} disabled={!isConnected}>
          Login
        </button>
        <button onClick={logout} disabled={!isConnected}>
          Logout
        </button>
      </div>
      <div>
        <input type="number" id="vote" onChange={(e)=> setVote(Number(e.target.value))} placeholder="Enter vote" />
        <button onClick={submitVote} disabled={!isConnected}>
          Submit Vote
        </button>
      </div>
      <div id="userConnected">
        {userConnected.map((message, index) => (
          <div key={message + index}>{message}</div>
        ))}
      </div>
      <div id="voteList">
        {voteList.map((vote, index) => (
          <div key={vote + index}>{vote}</div>
        ))}
      </div>
    </div>
  );
};

export default PokerPlanningPage;
