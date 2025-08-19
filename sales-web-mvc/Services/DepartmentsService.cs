using Microsoft.EntityFrameworkCore;
using SalesWebMvc.Data;
using SalesWebMvc.Dto;
using SalesWebMvc.Models;
using SalesWebMvc.Services.Exceptions;
using System.Net;

namespace SalesWebMvc.Services
{
    public class DepartmentsService
    {
        private SalesWebMvcContext _context;

        public DepartmentsService(SalesWebMvcContext context)
        {
            _context = context;
        }


        public async Task<List<DepartmentReadDto>> FindAllAsync()
        {

            List<DepartmentReadDto> departmentReadList = await _context.Department
         .OrderBy(d => d.Name)
         .Select(d => new DepartmentReadDto
         {
             Id = d.Id,
             Name = d.Name,
             Sellers = d.Sellers.Select(s => new SellerBasicDto
             {
                 Id = s.Id,
                 Name = s.Name,
                 Email = s.Email
             }).ToList()
         })
         .ToListAsync();

            return departmentReadList;
        }



        public async Task<DepartmentReadDto> FindByIdAsync(int id)
        {
            DepartmentReadDto? departmentDto = await _context.Department.
                Where(d => d.Id == id)
                .Select(d => new DepartmentReadDto
                {
                    Id = d.Id,
                    Name = d.Name,
                    Sellers = d.Sellers
                .Select(s => new SellerBasicDto
                {
                    Name = s.Name,
                    Email = s.Email,
                    Id = s.Id
                }).ToList()
                })
                .FirstOrDefaultAsync();

            if (departmentDto == null)
            {
                throw new NotFoundException("Department not found.");
            }
            else
            {
                return departmentDto;
            }


        }


        public async Task<DepartmentReadDto> CreateDepartmentAsync(DepartmentCreateDto dto)
        {
            if(dto.Name == null)
            {
                throw new BusinessException("Invalid name.");
            }

            Department department = new(dto.Name);

            _context.Department.Add(department);
            await _context.SaveChangesAsync();

            DepartmentReadDto departmentRead = new()
            {
                Id = department.Id,
                Name = department.Name,
                Sellers = department.Sellers.Select(s => new SellerBasicDto { Id = s.Id, Name = s.Name, Email = s.Email }).ToList()
            };

            return departmentRead;
        }



        public async Task UpdateDepartmentAsync(int id, DepartmentCreateDto dto)
        {
            if (dto.Name == null)
                throw new BusinessException("Invalid name.");

            Department? department = await _context.Department.FirstOrDefaultAsync(d => d.Id == id) ?? throw new NotFoundException("Id not found.");
            department.Name = dto.Name;
            _context.Entry(department).State = EntityState.Modified;

            await _context.SaveChangesAsync();
            
        }

        public async Task DeleteDepartmentAsync(int? id)
        {

            
            Department? department = await _context.Department.FirstOrDefaultAsync(d => d.Id == id);

            if (department == null)
            {
                throw new NotFoundException("Department not found.");
            }
            else
            {
                _context.Department.Remove(department);
            }

            await _context.SaveChangesAsync();


        }
    }
}
