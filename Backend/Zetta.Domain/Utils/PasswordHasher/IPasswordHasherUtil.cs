namespace Zetta.Domain;

public interface IPasswordHasherUtil
{
    string HashPassword(string password);
    bool ValidatePassword(string rawPassword, string storedHash);
}
