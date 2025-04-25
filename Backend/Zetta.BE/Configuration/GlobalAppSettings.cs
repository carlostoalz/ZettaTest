using Microsoft.Extensions.Options;

namespace Zetta.BE;

public class GlobalAppSettings
{
    public AppSetting Settings { get; set; }
    public GlobalAppSettings(IOptions<AppSetting> settings) => this.Settings = settings.Value;
}
