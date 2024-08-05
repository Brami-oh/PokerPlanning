namespace ScrumPoker.Api.Hubs
{
    using Microsoft.AspNetCore.SignalR;
    using ScrumPoker.Api.DomainObjects.Requests;
    using System.Threading.Tasks;

    public class PokerPlanningHub : Hub
    {
        public async Task LoginUser(string username)
        {
            await Clients.All.SendAsync("UserLoggedIn", username);
        }

        public async Task LogoutUser(string username)
        {
            await Clients.All.SendAsync("UserLoggedOut", username);
        }

        public async Task Vote(VotePokerPlanning request)
        {
            await Clients.All.SendAsync("ReceiveVote", request);
        }
    }

}
