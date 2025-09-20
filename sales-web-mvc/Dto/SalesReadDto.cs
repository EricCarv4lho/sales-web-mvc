using SalesWebMvc.Models.Enums;

namespace SalesWebMvc.Dto
{
    public class SalesReadDto
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public double Amount { get; set; }
        public SaleStatus Status { get; set; }
        public string SellerName { get; set; }

        public SellerReadDto SellerDto { get; set; }
        
        public SalesReadDto() { }
        public SalesReadDto(DateTime date, double amount, SaleStatus status, string sellerName )
        {  
            Date = date;
            Amount = amount;
            Status = status;
            SellerName = sellerName;
            
            
           
        }

        public SalesReadDto(DateTime date, double amount, SaleStatus status, SellerReadDto sellerReadDto)
        {
            Date = date;
            Amount = amount;
            Status = status;
            SellerDto = sellerReadDto;



        }
    }
}
