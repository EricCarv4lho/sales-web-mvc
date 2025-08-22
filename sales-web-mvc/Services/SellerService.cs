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

        public async Task<List<SellerReadDto>> FindAllAsync()
        {
            var sellers = await _context.Seller.Select(s => new SellerReadDto
            {
                Id = s.Id,
                Name = s.Name,
                Email = s.Email,
                BaseSalary = s.BaseSalary,
                BirthDate = s.BirthDate,
                DepartmentId = s.DepartmentId,
                DepartmentName = s.Department.Name
            }).ToListAsync();

            return sellers;
        }

        public async Task<SellerReadDto> FindByIdDtoAsync (int? id)
        {

            SellerReadDto? sellerRead = await _context.Seller.Where(s => s.Id == id).Select(seller => new SellerReadDto
            {
                Id = seller.Id,
                Name = seller.Name,
                Email = seller.Email,
                BaseSalary = seller.BaseSalary,
                BirthDate = seller.BirthDate,
                DepartmentId = seller.DepartmentId,
                DepartmentName = seller.Department.Name
            }).FirstOrDefaultAsync();

            if (sellerRead == null)
            {
                throw new NotFoundException("Seller not found.");
            }
            else
            {
                return sellerRead;
            }
            

        }

        public async Task<Seller> FindByIdAsync(int? id)
        {

            Seller? seller = await _context.Seller.Where(s => s.Id == id).Include(s => s.Department).FirstOrDefaultAsync();
            if (seller == null)
            {
                throw new NotFoundException("Seller not found.");
            }

            return seller;


        }

        public async Task RemoveSellerAsync (int id)
        {
            Seller? seller = await _context.Seller.FirstOrDefaultAsync(s => s.Id == id);
            if (seller == null)
            {
                throw new NotFoundException("Seller not found.");
            }
            else
            {
                _context.Remove(seller);

            }




           await _context.SaveChangesAsync();

        }

        public async Task<SellerReadDto> CreateSellerAsync(SellerCreateDto dto)
        {
            Department? department = await _context.Department.FirstOrDefaultAsync(d => d.Id == dto.DepartmentId);
            bool emailExists = await _context.Seller.AnyAsync(s => s.Email == dto.Email);

            if (emailExists)
            {
                throw new BusinessException("Emails already exists.");
                
            }
            if (department == null)
            {
                throw new BusinessException("Department not provided");
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


            Seller seller = new(dto.Name, dto.Email, birthDateSeller, dto.BaseSalary, department);

            _context.Seller.Add(seller);
            await _context.SaveChangesAsync();

            SellerReadDto sellerReadDto = new SellerReadDto
            {
                Id = seller.Id,
                Name = seller.Name,
                Email = seller.Email,
                BaseSalary = seller.BaseSalary,
                BirthDate = seller.BirthDate,
                DepartmentId = seller.DepartmentId,
                DepartmentName = seller.Department.Name

            };

            return sellerReadDto;
           
        }


        public async Task UpdateSellerAsync(int id, SellerCreateDto dto)
        {

           Seller seller =  await _context.Seller.FirstOrDefaultAsync(s => s.Id == id) ?? throw new NotFoundException("Id not found.");

            bool emailExists = await _context.Seller.AnyAsync(s => s.Email == dto.Email && s.Id != id);
            if (emailExists)
            {
                throw new BusinessException("Emails already exists.");

            }
            

            if (dto.BaseSalary < 0)
            {
                throw new BusinessException("BaseSalary cannot be less than 0");

            }

            seller.Name = dto.Name;
            seller.Email = dto.Email;
            seller.BaseSalary = dto.BaseSalary;


            if (!DateTime.TryParseExact(dto.BirthDate, "dd/MM/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime birthDate))
            {
                throw new FormatException("Birthdate is not valid.");

            }

            birthDate = DateTime.SpecifyKind(birthDate, DateTimeKind.Utc);
            seller.BirthDate = birthDate;


            Department? department = await _context.Department.FirstOrDefaultAsync(d => d.Id == dto.DepartmentId);
            if (department != null)
            {
                seller.Department = department;
            }

            await _context.SaveChangesAsync();
            


        }
    }
}
