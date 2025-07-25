namespace SalesWebMvc.Dto
{
    public class DepartmentReadDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";

        public List<SellerBasicDto> Sellers { get; set; } = new();
    }
}
