using SalesWebMvc.Models;
using System.ComponentModel.DataAnnotations;

namespace SalesWebMvc.Dto
{
    public class SellerCreateDto
    {


        public string Name { get; set; } = "";


        public string Email { get; set; } = "";

        public double BaseSalary { get; set; } = 0;
        public DateTime BirthDate { get; set; } = DateTime.MinValue;

        public int DepartmentId { get; set; }

    }
}
