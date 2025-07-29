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
            Seller seller = _sellerService.FindById(id);
            return Ok(seller);
        }

        [HttpPost]
        public IActionResult CreateSeller([FromBody] SellerCreateDto dto)
        {
           
            Seller seller = _sellerService.CreateSeller(dto);
            if (seller == null)
                return BadRequest("Department is not valid");

            SellerReadDto readDto = new()
            {
                Id = seller.Id,
                Name = seller.Name,
                Email = seller.Email,
                BaseSalary = seller.BaseSalary,
                BirthDate = seller.BirthDate,
                DepartmentId = seller.Department.Id,
                DepartmentName = seller.Department.Name
            };

            return Ok(readDto);
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
