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
       
        public IActionResult GetSellers()
        {
            List<SellerReadDto> list = _sellerService.FindAllDtos();
            return Ok(list);
        }

        [HttpGet("{id}")]
        public IActionResult GetSeller(int id)
        {
            SellerReadDto seller = _sellerService.FindByIdSellerReadDto(id);
            return Ok(seller);
        }

        [HttpPost]
        public IActionResult CreateSeller([FromBody] SellerCreateDto dto)
        {

            // Passa o DTO e a data convertida para o service
            try
            {
                SellerReadDto seller = _sellerService.CreateSeller(dto);
                return Ok(seller);
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
        }
        

        [HttpPut("{id}")]
        public IActionResult UpdateSeller(int id, SellerCreateDto dto)
        {
         
         

            try   
            {
                
                _sellerService.UpdateSeller(id ,dto);
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
        public IActionResult DeleteSeller(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }
            else
            {
                _sellerService.RemoveSeller(id.Value);
            }

            return Ok();
        }

    }
}
