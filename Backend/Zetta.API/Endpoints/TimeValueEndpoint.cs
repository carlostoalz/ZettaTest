using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Zetta.BE;
using Zetta.Domain;

namespace Zetta.API;
internal static class TimeValueEndpoint
{
    internal static void TimeValueRoutes(this WebApplication app)
    {
        var group = app.MapGroup("api/timevalue").WithTags("Time Value");
        group.MapGet("/", [Authorize] async (ITimeValueService service) => Results.Extensions.ResultResponse(await service.GetTimeValuesAsync()));
        group.MapPost("/", [Authorize] async (ITimeValueService service, [FromBody] TimeValue timeValue) => Results.Extensions.ResultResponse(await service.AddTimeValueAsync(timeValue)));
        group.MapPut("/", [Authorize] async (ITimeValueService service, [FromBody] TimeValue timeValue) => Results.Extensions.ResultResponse(await service.UpdateTimeValueAsync(timeValue)));
        group.MapDelete("/", [Authorize] async (ITimeValueService service, [FromBody] TimeValue timeValue) => await service.DeleteTimeValueAsync(timeValue));
    }
}
