using System.Net.WebSockets;

namespace ScrumPoker.Api.Endpoints
{
    public static class WebSocketEndpoint
    {
        public static IEndpointRouteBuilder MapWebSocketEndpoint(this IEndpointRouteBuilder endpoints)
        {
            endpoints.Map("/socket", async (context) =>
             {
                 if (context.WebSockets.IsWebSocketRequest)
                 {
                     using var webSocket = await context.WebSockets.AcceptWebSocketAsync();
                     await Echo(webSocket);
                 }
                 else
                 {
                     context.Response.StatusCode = StatusCodes.Status400BadRequest;
                 }
             })
            .WithName("WebSocket")
            .WithOpenApi();

            return endpoints;
        }

        private static async Task Echo(WebSocket webSocket)
        {
            var buffer = new byte[1024 * 4];
            var receiveResult = await webSocket.ReceiveAsync(
                new ArraySegment<byte>(buffer), CancellationToken.None);

            while (!receiveResult.CloseStatus.HasValue)
            {
                await webSocket.SendAsync(
                    new ArraySegment<byte>(buffer, 0, receiveResult.Count),
                    receiveResult.MessageType,
                    receiveResult.EndOfMessage,
                    CancellationToken.None);

                receiveResult = await webSocket.ReceiveAsync(
                    new ArraySegment<byte>(buffer), CancellationToken.None);
            }

            await webSocket.CloseAsync(
                receiveResult.CloseStatus.Value,
                receiveResult.CloseStatusDescription,
                CancellationToken.None);
        }
    }
}
