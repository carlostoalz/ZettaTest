

using Microsoft.EntityFrameworkCore;
using Zetta.Infraestructure;

namespace Zetta.API;
internal static class EntityFrameworkExtension
{
    internal static void AddEntityFramework(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<ApplicationDbContext>(options =>
        {
            options.UseSqlServer(configuration.GetValue<string>("App:DbConnection"));
            options.EnableSensitiveDataLogging(false);
        }, ServiceLifetime.Scoped);
    }
}