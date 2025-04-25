using System.ComponentModel.DataAnnotations.Schema;

namespace Zetta.BE;

[Table("TimeValues", Schema = "dbo")]
public class TimeValue
{
    public int Id {get; set; }
    public DateTime Date {get; set; }
    public int Value {get; set; }
    public int CreatedBy {get; set; }
    public DateTime CreatedAt { get; set; }
}
