using Microsoft.EntityFrameworkCore;
using SalesWebMvc.Data;
using SalesWebMvc.Dto;
using SalesWebMvc.Models;
using System.Globalization;

namespace SalesWebMvc.Services
{
    public class SellerService
    {
        private readonly SalesWebMvcContext _context;

        public SellerService(SalesWebMvcContext context)
        {
            _context = context;
        }

        public List<SellerReadDto> findAllDtos()
        {
            var sellers = _context.Seller.Include(s => s.Department).ToList();

            return sellers.Select(s => new SellerReadDto
            {
                Id = s.Id,
                Name = s.Name,
                Email = s.Email,
                BaseSalary = s.BaseSalary,
                BirthDate = s.BirthDate,
                DepartmentId = s.Department.Id,
                DepartmentName = s.Department.Name
            }).ToList();
        }


        public Seller createSeller(SellerCreateDto dto)
        {
            var department = _context.Department.FirstOrDefault(d => d.Id == dto.DepartmentId);
            if (department == null) 
                return null;
            var dateString = dto.BirthDate.ToString("dd/MM/yyyy h:mm:ss tt");
            var dateConvert = DateTime.ParseExact(dateString, "dd/MM/yyyy h:mm:ss tt",
    CultureInfo.InvariantCulture);

            DateTime dataUtc = DateTime.SpecifyKind(dateConvert, DateTimeKind.Utc);

            var seller = new Seller(dto.Name, dto.Email, dataUtc, dto.BaseSalary, department);

            _context.Seller.Add(seller);
            _context.SaveChanges();

            // 🔧 Carregar o seller já com o Department incluído
            return _context.Seller
                .Include(s => s.Department)
                .FirstOrDefault(s => s.Id == seller.Id)!;
        }
    }
}
