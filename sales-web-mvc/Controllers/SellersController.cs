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
            var list = _sellerService.findAllDtos();
            return Ok(list);
        }

        [HttpPost]
        public IActionResult CreateSeller([FromBody] SellerCreateDto dto)
        {
           
            var seller = _sellerService.createSeller(dto);
            if (seller == null)
                return BadRequest("Department is not valid");

            var readDto = new SellerReadDto
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

    }
}
