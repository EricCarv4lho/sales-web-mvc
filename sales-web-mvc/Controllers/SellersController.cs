using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations.Operations;
using SalesWebMvc.Dto;
using SalesWebMvc.Models;
using SalesWebMvc.Services;
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
            List<SellerReadDto> list = _sellerService.findAllDtos();
            return Ok(list);
        }

        [HttpGet("{id}")]
        public IActionResult GetSeller(int id)
        {
            SellerReadDto seller = _sellerService.FindById(id);
            return Ok(seller);
        }

        [HttpPost]
        public IActionResult CreateSeller([FromBody] SellerCreateDto dto)
        {
            DateTime birthDateSeller;

            bool isDateValid = DateTime.TryParseExact(dto.BirthDate, "dd/MM/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out birthDateSeller);
            if (!isDateValid)
                return BadRequest("BirthDate is not valid");

            // Ajusta para UTC
            birthDateSeller = DateTime.SpecifyKind(birthDateSeller, DateTimeKind.Utc);

            // Passa o DTO e a data convertida para o service
            SellerReadDto seller = _sellerService.CreateSeller(dto, birthDateSeller);
            if (seller == null)
                return BadRequest("Department is not valid");

            return Ok(seller);
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
