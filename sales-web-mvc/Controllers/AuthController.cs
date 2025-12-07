
using Microsoft.AspNetCore.Mvc;
using SalesWebMvc.Dto;
using SalesWebMvc.Services;

namespace SalesWebMvc.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : Controller
    { 
        
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public IActionResult Register(RegisterRequest registerRequest)
        {
            try
            {
                var response = _authService.Register(registerRequest);
                return Ok(response);
            }
            catch(Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("login")]
        public IActionResult Login(LoginRequest loginRequest)
        {
            try
            {
                var response = _authService.Login(loginRequest);
                return Ok(response);
            }
            catch(Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }

           
        }
    }
}
