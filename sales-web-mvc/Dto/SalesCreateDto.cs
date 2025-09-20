using SalesWebMvc.Models.Enums;

namespace SalesWebMvc.Dto
{
    public class SalesCreateDto
    {
      
        public string Date { get; set; }
        public double Amount { get; set; }
        public int Status { get; set; }
        public int SellerId { get; set; }
    }
}
