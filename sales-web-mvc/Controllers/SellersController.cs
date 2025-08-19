using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations.Operations;
using SalesWebMvc.Dto;
using SalesWebMvc.Models;
using SalesWebMvc.Services;
using SalesWebMvc.Services.Exceptions;
using System.Globalization;
namespace SalesWebMvc.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
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
            List<SellerReadDto> list = await _sellerService.FindAllAsync();
            return Ok(list);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSellerById(int id)
        {
            SellerReadDto seller = await _sellerService.FindByIdDtoAsync(id);
            return Ok(seller);
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
        }
        

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSeller(int id, SellerCreateDto dto)
        {
         
         

            try   
            {
                
                await _sellerService.UpdateSellerAsync(id ,dto);
                return NoContent();

            }
            catch(NotFoundException)
            {
                return NotFound();
            }

            catch (DbConcurrencyException)
            {
                return BadRequest();
            }
            
       

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSeller(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }
            try
            {
                await _sellerService.RemoveSellerAsync(id.Value);
                return Ok();
            }

            catch (NotFoundException)
            {
                return NotFound();
            }

        }

    }
}
