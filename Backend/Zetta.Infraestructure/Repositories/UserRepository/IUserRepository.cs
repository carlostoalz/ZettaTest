using Zetta.BE;

namespace Zetta.Infraestructure;

public interface IUserRepository
{
    Task<User> CreateUserAsync(User user);
    Task<User> UpdateUserAsync(User user);
    Task<User> GetUserByUsername(string username);
}
