using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NuGet.Versioning;
using SalesWebMvc.Data;
using SalesWebMvc.Dto;
using SalesWebMvc.Models;
using SalesWebMvc.Services.Exceptions;
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

        public List<SellerReadDto> FindAllDtos()
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

        public SellerReadDto FindByIdSellerReadDto(int? id)
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

        public Seller FindById(int? id)
        {

            var seller = _context.Seller.Include(s => s.Department).FirstOrDefault(s => s.Id == id);
            if (seller == null)
            {
                throw new KeyNotFoundException("Vendedor nao encontrado");
            }
            else
            {
                return seller;



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

        public SellerReadDto CreateSeller(SellerCreateDto dto)
        {
            var department = _context.Department.FirstOrDefault(d => d.Id == dto.DepartmentId);
            if (department == null)
            {
                throw new NotFoundException("Id not found.");
            }

            if (dto.BaseSalary < 0)
            {
                throw new BusinessException("BaseSalary cannot be less than 0");

            }



            bool isDateValid = DateTime.TryParseExact(dto.BirthDate, "dd/MM/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime birthDateSeller);
            if (!isDateValid)
                throw new BusinessException("Birthdate is not valid.");

            // Ajusta para UTC
            birthDateSeller = DateTime.SpecifyKind(birthDateSeller, DateTimeKind.Utc);


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


        public void UpdateSeller(int id, SellerCreateDto dto)
        {

            var seller = _context.Seller.FirstOrDefault(s => s.Id == id) ?? throw new NotFoundException("Seller not found.");
            seller.Name = dto.Name;
            seller.Email = dto.Email;
            seller.BaseSalary = dto.BaseSalary;


            if (!DateTime.TryParseExact(dto.BirthDate, "dd/MM/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime birthDate))
            {
                throw new FormatException("Birthdate is not valid.");

            }

            birthDate = DateTime.SpecifyKind(birthDate, DateTimeKind.Utc);
            seller.BirthDate = birthDate;


            var department = _context.Department.FirstOrDefault(d => d.Id == dto.DepartmentId);
            if (department != null)
            {
                seller.Department = department;
            }

            _context.SaveChanges();



        }
    }
}
