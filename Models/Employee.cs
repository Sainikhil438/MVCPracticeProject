using System.ComponentModel.DataAnnotations;

namespace MVCPracticeProject1.Models
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public float Salary { get; set; }
    }
}
