using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Data;
using Zetta.BE;

namespace Zetta.Infraestructure;

public class ApplicationDbContext : IdentityDbContext, IApplicationDbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
    public IDbConnection Connection => Database.GetDbConnection();
    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<User>().HasKey(m => m.Id);
        builder.Entity<TimeValue>().HasKey(m => m.Id);
        base.OnModelCreating(builder);
    }
}
