using SalesWebMvc.Models.Enums;

namespace SalesWebMvc.Dto
{
    public class SalesReadDto
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public double Amount { get; set; }
        public SaleStatus Status { get; set; }
        public SellerReadDto SellerDto { get; set; }
        public SalesReadDto() { }
        public SalesReadDto(DateTime date, double amount, SaleStatus status, SellerReadDto seller )
        {  
            Date = date;
            Amount = amount;
            Status = status;
            SellerDto = seller;
            
           
        }
    }
}
