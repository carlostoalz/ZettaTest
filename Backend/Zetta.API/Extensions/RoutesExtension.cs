namespace Zetta.API;
internal static class RoutesExtension
{
    internal static void UseUserRoutes(this WebApplication app)
    {
        app.UserRoutes();
        app.TimeValueRoutes();
    }
}