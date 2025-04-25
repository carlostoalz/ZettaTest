using Microsoft.AspNetCore.Mvc;
using Zetta.BE;
using Zetta.Domain;

namespace Zetta.API;

internal static class UserEndpoint
{
    internal static void UserRoutes(this WebApplication app)
    {
        var group = app.MapGroup("api/users").WithTags("Users");
        group.MapPost("/login", async (IUserService service, [FromBody] User user) => Results.Extensions.ResultResponse(await service.LoginAsync(user)));
        group.MapPost("/Register", async (IUserService service, [FromBody] User user) => Results.Extensions.ResultResponse(await service.RegisterUserAsync(user)));
    }
}
