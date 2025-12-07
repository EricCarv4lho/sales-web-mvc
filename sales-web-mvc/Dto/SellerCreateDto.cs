using SalesWebMvc.Models;
using System.ComponentModel.DataAnnotations;

namespace SalesWebMvc.Dto
{
    public class SellerCreateDto
    {


        public string Name { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public double BaseSalary { get; set; } = 0;
        public string BirthDate { get; set; } = string.Empty;

        public int DepartmentId { get; set; }


       

    }


}
