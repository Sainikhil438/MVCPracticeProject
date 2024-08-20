using Microsoft.EntityFrameworkCore;
using MVCPracticeProject1.Models;

namespace MVCPracticeProject1.Data
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext>options) :base(options){ }

        public DbSet<Employee> Employees { get; set; }
    }
}
