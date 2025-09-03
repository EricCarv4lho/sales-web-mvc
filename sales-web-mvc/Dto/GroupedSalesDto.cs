namespace SalesWebMvc.Dto
{
    public class GroupedSalesDto
    {
        public string DepartmentName { get; set; } = string.Empty;
        public List<SalesReadDto> Sales { get; set; } = new();
    }
}
