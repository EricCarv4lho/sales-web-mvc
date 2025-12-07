using SalesWebMvc.Models.Enums;

namespace SalesWebMvc.Dto
{
    public class SalesCreateDto
    {
      
        public string Date { get; set; } = string.Empty;
        public double Amount { get; set; } = 0;
        public int Status { get; set; } = 0;
        public int SellerId { get; set; }
    }
}
