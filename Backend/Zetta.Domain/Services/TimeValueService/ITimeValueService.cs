using Zetta.BE;

namespace Zetta.Domain;

public interface ITimeValueService
{
    Task<IEnumerable<TimeValue>> GetTimeValuesAsync();
    Task<TimeValue> AddTimeValueAsync(TimeValue timeValue);
    Task<TimeValue> UpdateTimeValueAsync(TimeValue timeValue);
    Task<TimeValue> DeleteTimeValueAsync(int id);
}
