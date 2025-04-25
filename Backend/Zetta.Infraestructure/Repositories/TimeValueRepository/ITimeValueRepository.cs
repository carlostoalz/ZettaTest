using Zetta.BE;

namespace Zetta.Infraestructure;

public interface ITimeValueRepository
{
    Task<IEnumerable<TimeValue>> GetTimeValuesAsync();
    Task<TimeValue> AddTimeValueAsync(TimeValue timeValue);
    Task<TimeValue> UpdateTimeValueAsync(TimeValue timeValue);
    Task DeleteTimeValueAsync(TimeValue timeValue);
}
