using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SalesWebMvc.Dto;
using SalesWebMvc.Services;
using SalesWebMvc.Services.Exceptions;
namespace SalesWebMvc.Controllers
{ 
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class SellersController : ControllerBase
    {
        private readonly SellerService _sellerService;

        public SellersController(SellerService sellerService)
        {
            _sellerService = sellerService;
            
        }

        [HttpGet]     
        public async Task<IActionResult> GetSellers()
        {
            try
            {
                List<SellerReadDto> list = await _sellerService.FindAllAsync();
                return Ok(list);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }

           
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSellerById(int id)
        {  
            if(id <= 0)
            {
                return BadRequest("Invalid seller ID.");
            }

            try
            {
                SellerReadDto seller = await _sellerService.FindByIdDtoAsync(id);
                return Ok(seller);
            }
            catch (NotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }


        }

        [HttpPost]
        public async Task<IActionResult> CreateSeller([FromBody] SellerCreateDto dto)
        {

            
            try
            {
                SellerReadDto seller = await _sellerService.CreateSellerAsync(dto);
                return CreatedAtAction(nameof(GetSellerById), new { id = seller.Id }, seller);
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }
        

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSeller(int id, SellerCreateDto dto)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid seller ID.");
            }

            try   
            { 
                await _sellerService.UpdateSellerAsync(id ,dto);
                return NoContent();
            }
            catch(NotFoundException ex)
            {
                return BadRequest(new { message = ex.Message });

            }
            catch (BusinessException ex)
            {
                return BadRequest(new { message = ex.Message });

            }

            catch (DbConcurrencyException ex)
            {
                return BadRequest(new { message = ex.Message });

            }

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSeller(int id)
        {
            if(id <= 0)
            {
                return BadRequest("Invalid seller ID.");
            }

            try
            {
                await _sellerService.RemoveSellerAsync(id);
                return Ok();
            }

            catch (NotFoundException)
            {
                return NotFound();
            }

        }

    }
}
