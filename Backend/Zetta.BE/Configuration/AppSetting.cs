namespace Zetta.BE;

public class AppSetting
{
    public string DbConnection { get; set; }
    public string SaltEncryption { get; set; }
    public string JwtKey { get; set; }
}
