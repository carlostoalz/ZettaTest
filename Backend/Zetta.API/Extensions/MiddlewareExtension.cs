using System.Diagnostics.CodeAnalysis;

namespace Zetta.API;
[ExcludeFromCodeCoverage]
public static class MiddlewareExtension
{
    public static void UseUserMiddlewares(this WebApplication app)
    {
        app.UseMiddleware<ExceptionMiddleware>();
    }
}