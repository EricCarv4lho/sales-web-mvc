using Microsoft.EntityFrameworkCore;
using SalesWebMvc.Data;
using SalesWebMvc.Dto;
using SalesWebMvc.Migrations;
using SalesWebMvc.Models;
using SalesWebMvc.Services.Exceptions;
using System.Globalization;

namespace SalesWebMvc.Services
{
    public class SalesRecordsService
    {
        private SalesWebMvcContext _context;


        public SalesRecordsService(SalesWebMvcContext context)
        {
            _context = context;
        }


        public async Task<List<SalesReadDto>> FindByDateAsync(string? init, string? final)
        {
           
            if (string.IsNullOrEmpty(init) || string.IsNullOrEmpty(final))
            {
                var sales = _context.SalesRecord
                    .Select(x => new SalesReadDto
                    {
                        Date = x.Date,
                        Amount = x.Amount,
                        Status = x.SaleStatus,
                        Id = x.Id,
                        SellerDto = new SellerReadDto
                        {
                            BaseSalary = x.Seller.BaseSalary,
                            Name = x.Seller.Name,
                            BirthDate = x.Seller.BirthDate,
                            Email = x.Seller.Email,
                            DepartmentId = x.Seller.Department.Id,
                            DepartmentName = x.Seller.Department.Name,
                            Id = x.Seller.Id
                        }
                    });

                return await sales.ToListAsync();
            }

            // Se init e final forem passados, tenta converter
            bool dateInitValid = DateTime.TryParseExact(init, "dd/MM/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime initial);
            if (!dateInitValid)
                throw new BusinessException("Initial Date is not valid.");

            bool dateFinalValid = DateTime.TryParseExact(final, "dd/MM/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime end);
            if (!dateFinalValid)
                throw new BusinessException("Final date is not valid.");

            initial = DateTime.SpecifyKind(initial, DateTimeKind.Utc);
            end = DateTime.SpecifyKind(end, DateTimeKind.Utc);

            var filteredSales = _context.SalesRecord
                .Where(x => x.Date >= initial && x.Date <= end)
                .Select(x => new SalesReadDto
                {
                    Date = x.Date,
                    Amount = x.Amount,
                    Status = x.SaleStatus,
                    Id = x.Id,
                    SellerDto = new SellerReadDto
                    {
                        BaseSalary = x.Seller.BaseSalary,
                        Name = x.Seller.Name,
                        BirthDate = x.Seller.BirthDate,
                        Email = x.Seller.Email,
                        DepartmentId = x.Seller.Department.Id,
                        DepartmentName = x.Seller.Department.Name,
                        Id = x.Seller.Id
                    }
                });

            return await filteredSales.ToListAsync();
        }




    }
}
