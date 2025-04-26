using Zetta.BE;
using Zetta.Infraestructure;

namespace Zetta.Domain;

public class TimeValueService(ITimeValueRepository repository) : ITimeValueService
{
    private ITimeValueRepository _repository { get; } = repository;
    public async Task<TimeValue> AddTimeValueAsync(TimeValue timeValue) => await this._repository.AddTimeValueAsync(timeValue);
    public async Task<TimeValue> DeleteTimeValueAsync(int id) => await this._repository.DeleteTimeValueAsync(id);
    public async Task<IEnumerable<TimeValue>> GetTimeValuesAsync() => await this._repository.GetTimeValuesAsync();
    public async Task<TimeValue> UpdateTimeValueAsync(TimeValue timeValue) => await this._repository.UpdateTimeValueAsync(timeValue);
}
