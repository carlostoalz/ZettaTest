using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Zetta.BE;
using Zetta.Infraestructure;

namespace Zetta.Domain;

public class UserService : IUserService
{
    private readonly IUserRepository _repository;
    private readonly IPasswordHasherUtil _passwordHasher;
    private readonly GlobalAppSettings _globalAppSettings;
    public UserService(IUserRepository repository, IPasswordHasherUtil passwordHasher, GlobalAppSettings globalAppSettings)
    {                  
        this._repository = repository;
        this._passwordHasher = passwordHasher;
        this._globalAppSettings = globalAppSettings;
    }
    public async Task<LoginResultDTO> LoginAsync(User user)
    {
        User registerdUser = await this._repository.GetUserByUsername(user.UserName);
        if (registerdUser != null) 
        {
            if (this._passwordHasher.ValidatePassword(user.Password, registerdUser.Password))
            {
                JwtSecurityToken token = new(
                        claims:
                        [
                            new Claim("Id", registerdUser.Id.ToString()),
                            new Claim(ClaimTypes.Name, registerdUser.UserName)
                        ],
                        expires: DateTime.UtcNow.AddHours(1),
                        signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this._globalAppSettings.Settings.JwtKey)),SecurityAlgorithms.HmacSha256)
                    );

                registerdUser.LastLogin = DateTime.Now;
                await this._repository.UpdateUserAsync(registerdUser);

                return new()
                {
                    Token = new JwtSecurityTokenHandler().WriteToken(token),
                    IsCorrect = true,
                };
            } 
            else
            {
                return new()
                {
                    IsCorrect = false,
                    ErrorMessage = "Wrong Password."
                };
            }
        }
        else
        {
            return new()
            {
                IsCorrect = false,
                ErrorMessage = "User doesn't exist."
            };
        }
    }

    public async Task<User> RegisterUserAsync(User user)
    {
        user.Password = this._passwordHasher.HashPassword(user.Password);
        user = await this._repository.CreateUserAsync(user);
        user.Password = null;
        return user;
    }
}
