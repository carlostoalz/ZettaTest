using Zetta.BE;

namespace Zetta.Infraestructure;

public class UserRepository(IGenericRepository<User> repository) : IUserRepository
{
    private IGenericRepository<User> _repository { get; } = repository;
    public async Task<User> CreateUserAsync(User user) => await this._repository.AddAsync(user);
    public async Task<User> UpdateUserAsync(User user) => await _repository.UpdateAsync(user);
    public async Task<User> GetUserByUsername(string username) => await this._repository.GetFilterFirstOrDefaultAsync(u => u.UserName == username);
}
