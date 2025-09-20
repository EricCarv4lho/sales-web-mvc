namespace SalesWebMvc.Dto
{
        public class SellerReadDto
        {
            public int Id { get; set; }
            public string Name { get; set; } = "";
            public string Email { get; set; } = "";
            public double BaseSalary { get; set; }
            public DateTime BirthDate { get; set; }
            public int DepartmentId { get; set; }
            public string DepartmentName { get; set; } = "";
        }
    

}
