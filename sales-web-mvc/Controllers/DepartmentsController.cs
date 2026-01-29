using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SalesWebMvc.Dto;
using SalesWebMvc.Models;
using SalesWebMvc.Services;
using SalesWebMvc.Services.Exceptions;
using System.IdentityModel.Tokens.Jwt;
using System.Linq.Expressions;
using System.Security.Claims;
namespace SalesWebMvc.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class DepartmentsController : ControllerBase
    {
        private readonly DepartmentsService _service;

        public DepartmentsController(DepartmentsService service)
        {
            _service = service;
        }

        // GET: api/departments

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<IEnumerable<DepartmentReadDto>>> GetDepartments()

        {


            List<DepartmentReadDto> departmentsDtoList = await _service.FindAllAsync();

            return Ok(departmentsDtoList);



        }



        // GET: api/departments/5
        [HttpGet("{id}")]

        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<DepartmentReadDto>> GetDepartment(int id)
        {

            if (id <= 0)
            {
                return BadRequest("Invalid department ID.");
            }

            try
            {
                DepartmentReadDto departmentDto = await _service.FindByIdAsync(id);



                return Ok(departmentDto);
            }
            catch (NotFoundException ex)
            {
                return NotFound(new
                {
                    message = ex.Message
                });
            }

            catch (Exception)
            {

                return StatusCode(500, new { error = "An unexpected error occurred." });
            }
        }





        // POST: api/departments

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<DepartmentReadDto>> PostDepartment(DepartmentCreateDto dto)
        {





            if (dto == null || string.IsNullOrWhiteSpace(dto.Name))
            {
                return BadRequest(new { error = "Department data is required." });
            }




            try
            {
                DepartmentReadDto departmentRead = await _service.CreateDepartmentAsync(dto);

                return CreatedAtAction(nameof(GetDepartment), new { id = departmentRead.Id }, departmentRead);
            }
            catch (BusinessException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
            catch (Exception)
            {
                return StatusCode(500, new { error = "An unexpected error occurred." });
            }
        }

        // PUT: api/departments/5
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> PutDepartment(int id, DepartmentCreateDto departmentDto)
        {

            if (id <= 0)
                return BadRequest("Invalid department ID.");


            if (departmentDto == null || string.IsNullOrEmpty(departmentDto.Name))
                return BadRequest("Department data is required.");


            try
            {
                await _service.UpdateDepartmentAsync(id, departmentDto);
                return NoContent();
            }
            catch (BusinessException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (DbConcurrencyException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception)
            {
                return BadRequest(new { message = "An unexpected error occurred." });
            }



        }

        // DELETE: api/departments/5
        [HttpDelete("{id}")]

        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> DeleteDepartment(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid department ID.");
            }
            try
            {
                await _service.DeleteDepartmentAsync(id);
                return NoContent();
            }

            catch (NotFoundException)
            {
                return NotFound(new { message = "Department not found." });

            }
            catch (Exception)
            {
                return StatusCode(500, new { error = "An unexpected error occurred." });
            }
        }


    }
}
