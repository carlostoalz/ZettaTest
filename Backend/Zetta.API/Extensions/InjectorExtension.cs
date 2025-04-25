using System.Diagnostics.CodeAnalysis;
using Zetta.BE;
using Zetta.Domain;
using Zetta.Infraestructure;

namespace Zetta.API;
[ExcludeFromCodeCoverage]
internal static class InjectorExtension
{
    internal static void AddDependencys(this IServiceCollection services)
    {
        services.AddSingleton<GlobalAppSettings>();

        #region Domain
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<ITimeValueService, TimeValueService>();
        services.AddScoped<IPasswordHasherUtil, PasswordHasherUtil>();
        #endregion            

        #region Infraestructure
        services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<ITimeValueRepository, TimeValueRepository>();
        #endregion
    }
}