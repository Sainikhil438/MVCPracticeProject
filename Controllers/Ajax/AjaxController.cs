using Microsoft.AspNetCore.Mvc;
using MVCPracticeProject1.Data;
using MVCPracticeProject1.Models;
using System.Linq;

namespace MVCPracticeProject1.Controllers.Ajax
{
    public class AjaxController : Controller
    {
        private readonly ApplicationContext context;
        public AjaxController(ApplicationContext context) 
        {
            this.context = context;
        } 
        public IActionResult Index()
        {
            return View();
        }

        public JsonResult EmployeeList()
        {
            var data = context.Employees.ToList();
            return new JsonResult(data);
        }

        [HttpPost]
        public JsonResult AddEmployee(Employee employee)
        {
            var emp = new Employee()
            {
                Name = employee.Name,
                State = employee.State,
                City = employee.City,
                Salary = employee.Salary
            };
            context.Employees.Add(emp);
            context.SaveChanges();
            return new JsonResult("Data is Saved");
        }

        public JsonResult Delete(int id)
        {
            var data = context.Employees.Where(e => e.Id == id).SingleOrDefault();
            context.Remove(data);
            context.SaveChanges();
            return new JsonResult("Data Deleted");
        }

        public JsonResult Edit(int id)
        {
            var data = context.Employees.Where(d => d.Id == id).SingleOrDefault();
            return new JsonResult(data);
        }

        

        public JsonResult Update(Employee employee)
        {
            var existingEmployee = context.Employees.FirstOrDefault(e => e.Id == employee.Id);
            if (existingEmployee != null)
            {
                existingEmployee.Name = employee.Name;
                existingEmployee.State = employee.State;
                existingEmployee.City = employee.City;
                existingEmployee.Salary = employee.Salary;

                context.SaveChanges();
                return new JsonResult("Record Updated");
            }
            return new JsonResult("Employee Not Found");
        }
    }
}
