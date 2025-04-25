using System.Diagnostics.CodeAnalysis;

namespace Zetta.API;

[ExcludeFromCodeCoverage]
internal static class CorsExtension
{
    internal static void AddCorsDocumentation(this IServiceCollection services, string allowedOrigins) => services.AddCors(
        options =>
        {
            options.AddPolicy("ZettaPolicy",
                policy =>
                {
                    policy
                    .WithOrigins(allowedOrigins.Split(";"))
                    .AllowAnyHeader()
                    .AllowAnyMethod();
                });
        }
    );

    internal static void UseCorsDocumentation(this IApplicationBuilder app) => app.UseCors("ZettaPolicy");
}