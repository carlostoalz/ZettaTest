using System.ComponentModel.DataAnnotations.Schema;

namespace Zetta.BE;

[Table("Users", Schema = "dbo")]
public class User
{
    public int Id {get; set;}
    public string UserName { get; set;}
    public string Password  {get; set;}
    public DateTime CreatedAt {get; set;}
    public DateTime? LastLogin { get; set; }
}
