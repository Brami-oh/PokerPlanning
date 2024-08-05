using Microsoft.AspNetCore.Cors.Infrastructure;
using ScrumPoker.Api.Hubs;

const string corsPolicy = "CorsPolicy";
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy(corsPolicy, p => p.WithOrigins("https://localhost:3000")
                                        .AllowAnyMethod()
                                        .AllowAnyHeader());
});

builder.Services.AddSignalR();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors(corsPolicy);
app.UseWebSockets(new WebSocketOptions
{
    KeepAliveInterval = TimeSpan.FromMinutes(2)
});

app.MapWeatherForecastEndpoint();
app.MapWebSocketEndpoint();

app.MapHub<PokerPlanningHub>("/pokerPlanningHub");

app.Run();
