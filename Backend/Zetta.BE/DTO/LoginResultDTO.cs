namespace Zetta.BE;

public class LoginResultDTO
{
    public string Token { get; set; }
    public bool IsCorrect { get; set; }
    public string ErrorMessage { get; set; }
}
