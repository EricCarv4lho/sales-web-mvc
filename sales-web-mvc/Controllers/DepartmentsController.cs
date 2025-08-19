using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NuGet.Protocol.Plugins;
using SalesWebMvc.Data;
using SalesWebMvc.Dto;
using SalesWebMvc.Models;
using SalesWebMvc.Services;
using SalesWebMvc.Services.Exceptions;
using System.Net;
namespace SalesWebMvc.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DepartmentsController : ControllerBase
    {
        private readonly DepartmentsService _service;

        public DepartmentsController(DepartmentsService service)
        {
            _service = service;
        }

        // GET: api/departments
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DepartmentReadDto>>> GetDepartments()
        {
            List<DepartmentReadDto> departmentsDtoList = await _service.FindAllAsync();

            return Ok(departmentsDtoList);
        }



        // GET: api/departments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DepartmentReadDto>> GetDepartment(int id)
        {



            DepartmentReadDto departmentDto = await _service.FindByIdAsync(id);

            
            return Ok(departmentDto);

            
        }

        // POST: api/departments
        
        [HttpPost]
        public async Task<ActionResult<DepartmentReadDto>> PostDepartment(DepartmentCreateDto dto)
        {   
            DepartmentReadDto departmentRead = await _service.CreateDepartmentAsync(dto);

            return CreatedAtAction(nameof(GetDepartment), new { id = departmentRead.Id }, departmentRead);
        }

        // PUT: api/departments/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDepartment(int id, DepartmentCreateDto departmentDto)
        {
            

            try
            {
                await _service.UpdateDepartmentAsync(id, departmentDto);
                return NoContent();
            }
            catch (NotFoundException)
            {
                return NotFound();
            }

            catch (DbConcurrencyException)
            {
                return BadRequest();
            }
            
           
        }

        // DELETE: api/departments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDepartment(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }
            try
            {
                await _service.DeleteDepartmentAsync(id);
                return Ok();
            }

            catch (NotFoundException)
            {
                return NotFound();
            }
        }

       
    }
}
