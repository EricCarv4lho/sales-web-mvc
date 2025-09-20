using Microsoft.AspNetCore.Mvc;
using SalesWebMvc.Dto;
using SalesWebMvc.Services;

namespace SalesWebMvc.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SalesRecordsController : ControllerBase
    {
        private readonly SalesRecordsService _salesRecordsService;

        public SalesRecordsController(SalesRecordsService salesRecordsService)
        {
            _salesRecordsService = salesRecordsService;
        }

        [HttpGet("simple")]
        public async Task<IActionResult> SimpleSearchAsync(DateTime startDate, DateTime finalDate)
        {
           
            List<SalesReadDto> lista = await _salesRecordsService.FindByDateSimpleAsync(startDate, finalDate);

            return Ok(lista);
        }

        [HttpGet("grouping")]
        public async Task<IActionResult> GroupingSearch(DateTime startDate, DateTime finalDate)
        {
          
            var lista = await _salesRecordsService.FindByDateGroupAsync(startDate, finalDate);

            return Ok(lista);
        }

        [HttpGet("all")]
        public async Task<IActionResult> FindAll ()
        {
            
            
            var lista = await _salesRecordsService.FindAllAsync();

            return Ok(lista);
        }

    }
}
