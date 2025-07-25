using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SalesWebMvc.Data;
using SalesWebMvc.Models;
using SalesWebMvc.Dto;
namespace SalesWebMvc.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DepartmentsController : ControllerBase
    {
        private readonly SalesWebMvcContext _context;

        public DepartmentsController(SalesWebMvcContext context)
        {
            _context = context;
        }

        // GET: api/departments
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DepartmentReadDto>>> GetDepartments()
        {
            var departments = await _context.Department
                .Include(d => d.Sellers)
                .ToListAsync();

            var dtoList = departments.Select(d => new DepartmentReadDto
            {
                Id = d.Id,
                Name = d.Name,
                Sellers = d.Sellers.Select(s => new SellerBasicDto
                {
                    Id = s.Id,
                    Name = s.Name,
                    Email = s.Email
                }).ToList()
            });

            return Ok(dtoList);
        }



        // GET: api/departments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Department>> GetDepartment(int id)
        {
            var department = await _context.Department.FindAsync(id);
            if (department == null)
            {
                return NotFound();
            }

            return department;
        }

        // POST: api/departments
        
        [HttpPost]
        public async Task<ActionResult<Department>> PostDepartment(DepartmentCreateDto dto)
        {
            var department = new Department
            {
                Name = dto.Name
            };

            _context.Department.Add(department);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetDepartment), new { id = department.Id }, department);
        }

        // PUT: api/departments/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDepartment(int id, Department department)
        {
            if (id != department.Id)
            {
                return BadRequest();
            }

            _context.Entry(department).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DepartmentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/departments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDepartment(int id)
        {
            var department = await _context.Department.FindAsync(id);
            if (department == null)
            {
                return NotFound();
            }

            _context.Department.Remove(department);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DepartmentExists(int id)
        {
            return _context.Department.Any(e => e.Id == id);
        }
    }
}
