using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SalesWebMvc.Dto;
using SalesWebMvc.Services;
using SalesWebMvc.Services.Exceptions;

namespace SalesWebMvc.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "USER")]
    public class SalesRecordsController : ControllerBase
    {
        private readonly SalesRecordsService _salesRecordsService;

        public SalesRecordsController(SalesRecordsService salesRecordsService)
        {
            _salesRecordsService = salesRecordsService;
        }

        [HttpPost]
        public async Task<IActionResult> RegisterSale(SalesCreateDto salesCreateDto)
        {

            if (salesCreateDto.SellerId <= 0)
            {
                return BadRequest("Invalid SellerId.");
            }
            try
            {
                SalesReadDto readDto = await _salesRecordsService.RegisterSale(salesCreateDto);

                return CreatedAtAction(nameof(FindById), new { id = readDto.Id }, readDto);

            }
            catch (NotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }


        [HttpGet("simple")]
        public async Task<IActionResult> SimpleSearchAsync(DateTime startDate, DateTime finalDate)
        {
            if (startDate > finalDate)
            {
                return BadRequest("Start date must be less than or equal to final date.");
            }

            List<SalesReadDto> lista = await _salesRecordsService.FindByDateSimpleAsync(startDate, finalDate);

            return Ok(lista);
        }

        [HttpGet("grouping")]
        public async Task<IActionResult> GroupingSearch(DateTime startDate, DateTime finalDate)
        {
            if (startDate > finalDate)
            {
                return BadRequest("Start date must be less than or equal to final date.");
            }

            var lista = await _salesRecordsService.FindByDateGroupAsync(startDate, finalDate);

            return Ok(lista);
        }

        [HttpGet("all")]
        public async Task<IActionResult> FindAll()
        {

            var lista = await _salesRecordsService.FindAllAsync();

            return Ok(lista);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> FindById(int id)
        {

            try
            {
                var lista = await _salesRecordsService.GetSaleById(id);

                return Ok(lista);
            }
            catch (NotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

    }
}
