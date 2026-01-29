using Microsoft.EntityFrameworkCore;
using SalesWebMvc.Data;
using SalesWebMvc.Dto;
using SalesWebMvc.Models;
using SalesWebMvc.Models.Enums;
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

        public async Task<SalesReadDto> RegisterSale(SalesCreateDto saleCreateDto)
        {



            if (saleCreateDto.Amount < 0)
            {
                throw new BusinessException("BaseSalary cannot be less than 0");

            }

            SaleStatus status;
            if (saleCreateDto.Status == 0)
                status = SaleStatus.Pendente;
            else if (saleCreateDto.Status == 1)
                status = SaleStatus.Faturado;
            else if (saleCreateDto.Status == 2)
                status = SaleStatus.Cancelado;
            else
                throw new ArgumentException("Status is not valid.");



            bool isDateValid = DateTime.TryParseExact(saleCreateDto.Date, "dd/MM/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime dateSale);
            if (!isDateValid)
                throw new BusinessException("Date is not valid.");


            dateSale = DateTime.SpecifyKind(dateSale, DateTimeKind.Utc);

            Seller seller = await _context.Seller.FirstOrDefaultAsync(x => x.Id == saleCreateDto.SellerId) ?? throw new NotFoundException("Seller not found.");


            SalesRecord sale = new(dateSale, saleCreateDto.Amount, status, seller);



            _context.SalesRecord.Add(sale);
            await _context.SaveChangesAsync();

            SalesReadDto saleRead = new()
            {
                Id = sale.Id,
                Amount = sale.Amount,
                Date = sale.Date,
                SellerName = sale.Seller.Name,
                Status = sale.SaleStatus
            };
            return saleRead;





        }

        public async Task<List<SalesReadDto>> FindByDateSimpleAsync(DateTime startDate, DateTime finalDate)
        {
            // Defina o fuso horário de Brasília (-03)
            var timeZone = TimeZoneInfo.FindSystemTimeZoneById("E. South America Standard Time");

            // Converta corretamente do horário local para UTC
            var initial = TimeZoneInfo.ConvertTimeToUtc(startDate.Date, timeZone);
            var end = TimeZoneInfo.ConvertTimeToUtc(finalDate.Date.AddDays(1).AddTicks(-1), timeZone);



            var filteredSales = _context.SalesRecord
                .OrderByDescending(x => x.Date)
                .Where(x => x.Date >= initial && x.Date <= end && x.IsActive)
                .Select(x => new SalesReadDto
                {
                    Date = x.Date,
                    Amount = x.Amount,
                    Status = x.SaleStatus,
                    Id = x.Id,
                    SellerName = x.Seller.Name,
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

        public async Task<List<GroupedSalesDto>> FindByDateGroupAsync(DateTime startDate, DateTime finalDate)
        {

            // Defina o fuso horário de Brasília (-03)
            var timeZone = TimeZoneInfo.FindSystemTimeZoneById("E. South America Standard Time");

            // Converta corretamente do horário local para UTC
            var initial = TimeZoneInfo.ConvertTimeToUtc(startDate.Date, timeZone);
            var end = TimeZoneInfo.ConvertTimeToUtc(finalDate.Date.AddDays(1).AddTicks(-1), timeZone);





            var sales = await _context.SalesRecord
    .Where(x => x.Date >= initial && x.Date <= end && x.IsActive)
    .Select(x => new SalesReadDto
    {
        Date = x.Date,
        Amount = x.Amount,
        Status = x.SaleStatus,
        Id = x.Id,
        SellerName = x.Seller.Name,
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
    })
    .ToListAsync();

            var grouped = sales
         .GroupBy(x => x.SellerDto.DepartmentName)
         .Select(g => new GroupedSalesDto
         {
             DepartmentName = g.Key,
             Sales = g.ToList()
         })
         .ToList();

            return grouped;
        }







        public async Task<SalesReadDto> GetSaleById(int id)
        {


            SalesReadDto? sale = await _context.SalesRecord.Where(x => x.Id == id).Select(s => new SalesReadDto
            {
                Amount = s.Amount,
                Status = s.SaleStatus,
                Date = s.Date,
                SellerName = s.Seller.Name
            }).FirstOrDefaultAsync();


            if (sale == null)
            {
                throw new NotFoundException("Seller not found.");
            }
            else
            {
                return sale;
            }

        }


        public async Task<List<SalesReadDto>> FindAllAsync()
        {


            List<SalesReadDto> sales = await _context.SalesRecord.Where(s => s.IsActive == true).Select(s => new SalesReadDto
            {
                Id = s.Id,
                Amount = s.Amount,
                Status = s.SaleStatus,
                Date = s.Date,
                SellerName = s.Seller.Name
            }).ToListAsync();



            return sales;


        }

        public async Task UpdateSales(int id, SalesCreateDto dto)
        {

            var sale = await _context.SalesRecord.FirstOrDefaultAsync(s => s.Id == id) ?? throw new NotFoundException("Sale not found.");

            sale.SaleStatus = (SaleStatus)dto.Status;
            sale.Amount = dto.Amount;
            bool isDateValid = DateTime.TryParseExact(dto.Date, "dd/MM/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime dateSale);
            if (!isDateValid)
                throw new BusinessException("Date is not valid.");
            dateSale = DateTime.SpecifyKind(dateSale, DateTimeKind.Utc);
            sale.Date = dateSale;
            Seller seller = await _context.Seller.FirstOrDefaultAsync(x => x.Id == dto.SellerId) ?? throw new NotFoundException("Seller not found.");
            sale.Seller = seller;

            await _context.SaveChangesAsync();



        }


        public async Task DeleteSaleAsync(int id)
        {
            SalesRecord? sale = await _context.SalesRecord.FirstOrDefaultAsync(s => s.Id == id) ?? throw new NotFoundException("Sale not found.");

            sale.IsActive = false;
            await _context.SaveChangesAsync();
        }
    }
}
