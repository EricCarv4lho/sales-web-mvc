
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SalesWebMvc.Dto;
using SalesWebMvc.Services;
using SalesWebMvc.Services.Exceptions;

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
            catch (AuthenticationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "Erro interno no servidor." });
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
            catch (AuthenticationException)
            {
                return Unauthorized(new { message = "Credenciais Inválidas" });
            }
            catch (Exception)
            {
                return StatusCode(500, new
                {
                    message = "Erro interno do servidor."
                });
            }


        }
    }
}
