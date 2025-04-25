using Zetta.BE;

namespace Zetta.Domain;

public interface IUserService
{
    Task<User> RegisterUserAsync(User user);
    Task<LoginResultDTO> LoginAsync(User user);
}
