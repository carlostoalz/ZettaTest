using System.Security.Cryptography;
using System.Text;
using Zetta.BE;

namespace Zetta.Domain;

public class PasswordHasherUtil(GlobalAppSettings globalAppSettings) : IPasswordHasherUtil
{
    private GlobalAppSettings _globalAppSettings { get; } = globalAppSettings;
    public string HashPassword(string password)
    {
        using var sha = SHA256.Create();
        var combined = Encoding.UTF8.GetBytes(password + _globalAppSettings.Settings.SaltEncryption);
        var hash = sha.ComputeHash(combined);
        return Convert.ToBase64String(hash);
    }

    public bool ValidatePassword(string rawPassword, string storedHash)
    {
        var hashOfInput = HashPassword(rawPassword);
        return hashOfInput == storedHash;
    }
}
