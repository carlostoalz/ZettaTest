using System.Data;

namespace Zetta.Infraestructure;

public interface IApplicationDbContext
{
    public IDbConnection Connection { get; }
}
