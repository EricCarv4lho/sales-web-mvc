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
            string? s = startDate.ToString("dd/MM/yyyy");
            string? f = finalDate.ToString("dd/MM/yyyy");
            List<SalesReadDto> lista = await _salesRecordsService.FindByDateSimpleAsync(s, f);

            return Ok(lista);
        }

        [HttpGet("grouping")]
        public async Task<IActionResult> GroupingSearch(DateTime startDate, DateTime finalDate)
        {
            string? s = startDate.ToString("dd/MM/yyyy");
            string? f = finalDate.ToString("dd/MM/yyyy");
            var lista = await _salesRecordsService.FindByDateGroupAsync(s, f);

            return Ok(lista);
        }

    }
}
