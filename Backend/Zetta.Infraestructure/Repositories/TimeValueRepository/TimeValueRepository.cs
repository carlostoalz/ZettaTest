using Zetta.BE;

namespace Zetta.Infraestructure;

public class TimeValueRepository(IGenericRepository<TimeValue> genericRepository) : ITimeValueRepository
{
    private IGenericRepository<TimeValue> _genericRepository { get; } = genericRepository;
    public async Task<TimeValue> AddTimeValueAsync(TimeValue timeValue) => await this._genericRepository.AddAsync(timeValue);
    public async Task<TimeValue> DeleteTimeValueAsync(long id) => await this._genericRepository.DeleteAsync(id);
    public async Task<IEnumerable<TimeValue>> GetTimeValuesAsync() => await this._genericRepository.GetAllAsync();
    public async Task<TimeValue> UpdateTimeValueAsync(TimeValue timeValue) => await this._genericRepository.UpdateAsync(timeValue);
}
