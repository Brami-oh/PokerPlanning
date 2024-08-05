using Microsoft.AspNetCore.Mvc;

namespace ScrumPoker.Api.Endpoints
{
    public static class WeatherForecastEndpoint
    {
        public static IEndpointRouteBuilder MapWeatherForecastEndpoint(this IEndpointRouteBuilder endpoints)
        {

            var summaries = new[]
            {
                "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
            };

            endpoints.MapPost("/chat", ([FromBody] dynamic request) =>
            {
                var forecast = Enumerable.Range(1, 5).Select(index =>
                    new WeatherForecast
                    (
                        DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                        Random.Shared.Next(-20, 55),
                        summaries[Random.Shared.Next(summaries.Length)]
                    ))
                    .ToArray();
                return forecast;
            })
            .WithName("ChatHub")
            .WithOpenApi();

            return endpoints;
        }
    }

   

}
