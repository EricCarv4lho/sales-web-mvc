using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using NuGet.Versioning;
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

        public SellerReadDto FindById(int? id)
        {   
           
            var seller = _context.Seller.Include(s => s.Department).FirstOrDefault(s => s.Id == id);
            if (seller == null)
            {
                throw new KeyNotFoundException("Vendedor nao encontrado");
            }
            else
            {
                return new SellerReadDto
                {
                    Id = seller.Id,
                    Name = seller.Name,
                    Email = seller.Email,
                    BaseSalary = seller.BaseSalary,
                    BirthDate = seller.BirthDate,
                    DepartmentId = seller.DepartmentId,
                    DepartmentName = seller.Department.Name
                };



            }

           
        }

        public void RemoveSeller(int id)
        {
            var seller = _context.Seller.Include(s => s.Department).FirstOrDefault(s => s.Id == id);
            if (seller == null)
            {
                throw new KeyNotFoundException("Vendedor nao encontrado");
            }
            else
            {
                _context.Remove(seller);



            }

           
            
           
            _context.SaveChanges();
            
        }

        public SellerReadDto CreateSeller(SellerCreateDto dto, DateTime birthDateSeller)
        {
            var department = _context.Department.FirstOrDefault(d => d.Id == dto.DepartmentId);
            if (department == null) return null;

            var seller = new Seller(dto.Name, dto.Email, birthDateSeller, dto.BaseSalary, department);

            _context.Seller.Add(seller);
            _context.SaveChanges();

            return new SellerReadDto
            {
                Id = seller.Id,
                Name = seller.Name,
                Email = seller.Email,
                BaseSalary = seller.BaseSalary,
                BirthDate = seller.BirthDate,
                DepartmentId = department.Id,
                DepartmentName = department.Name
            };
        }
    }
}
