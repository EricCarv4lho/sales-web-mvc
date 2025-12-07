
using Microsoft.IdentityModel.Tokens;
using SalesWebMvc.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SalesWebMvc.Services
{
   
    public  class TokenService
    {
        private readonly IConfiguration _configuration;


        public TokenService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string GenerateToken(User user)
        {

            var jwtSettings = _configuration.GetSection("Jwt");

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"] ?? string.Empty));

            var claims = new List<Claim>()
            {
                new(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new(ClaimTypes.Role, user.Role)
            };

            var issuer = jwtSettings["Issuer"];
            var audience = jwtSettings["Audience"];
            var expires = DateTime.UtcNow.AddMinutes(jwtSettings.GetValue<int>("DurationInMinutes"));
            var token = new JwtSecurityToken
            (
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: expires,               
                signingCredentials: new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256)
            );

            return new JwtSecurityTokenHandler().WriteToken(token);

        }

       
    }
}
