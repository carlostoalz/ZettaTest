using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Zetta.Infraestructure;

public class GenericRepository<T> : IGenericRepository<T> where T : class
{
    private readonly ApplicationDbContext _dbContext;
    private DbSet<T> _DbSet { get; set; }
    public GenericRepository(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
        _DbSet = _dbContext.Set<T>();
    }
    public async Task<T> AddAsync(T entity)
    {
        await _DbSet.AddAsync(entity);
        await _dbContext.SaveChangesAsync();
        return entity;
    }
    public async Task<List<T>> GetAllAsync(CancellationToken cancellationToken = default) => await _DbSet.ToListAsync(cancellationToken);
    public async Task<T> GetFilterFirstOrDefaultAsync(Expression<Func<T, bool>> predicate) => await _DbSet.Where(predicate).FirstOrDefaultAsync();
    public async Task<T> UpdateAsync(T entity)
    {
        _DbSet.Update(entity);
        await _dbContext.SaveChangesAsync();
        return entity;
    }
    public async Task<T> DeleteAsync(int id)
    {
        if (await _DbSet.FindAsync(id) is T entity)
        {
            _DbSet.Remove(entity);
            await _dbContext.SaveChangesAsync();
            return entity;
        }
        return null;
    }
}
