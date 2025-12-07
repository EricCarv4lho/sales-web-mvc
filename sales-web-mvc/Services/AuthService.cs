using Microsoft.IdentityModel.Tokens;
using SalesWebMvc.Data;
using SalesWebMvc.Dto;
using SalesWebMvc.Models;
using System.Security.Authentication;

namespace SalesWebMvc.Services
{
    public class AuthService
    {  
        private readonly SalesWebMvcContext _context;

        private TokenService? _tokenService;
        
        public AuthService(SalesWebMvcContext context, TokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        public AuthResponse Register(RegisterRequest registerRequest)
        {
            if (string.IsNullOrWhiteSpace(registerRequest.email) || string.IsNullOrWhiteSpace(registerRequest.password))            
                throw new ArgumentNullException("Invalid credentials");
            

            if(registerRequest.password != registerRequest.confirmPassword)            
                throw new ArgumentException("Password and confirmation password do not match.");
            

            if(_context.User.Any(x => x.Email.Equals(registerRequest.email)))    
                throw new InvalidOperationException("Email is already registered.");
            

            var encryptedPassword = BCrypt.Net.BCrypt.HashPassword(registerRequest.password);


            User user = new(registerRequest.email,encryptedPassword, "USER");

           
            
            _context.User.Add(user);

            _context.SaveChanges();

            var jwtToken = _tokenService.GenerateToken(user);

            return new AuthResponse(jwtToken);
        }


        public AuthResponse Login(LoginRequest loginRequest)
        {
            var user = _context.User.FirstOrDefault(u => u.Email == loginRequest.email);

            if (user == null)
            {
                throw new SecurityTokenException("Invalid credentials");
            }

            bool passwordIsValid = BCrypt.Net.BCrypt.Verify(loginRequest.password, user.Password);

            if (!passwordIsValid)
            {
                throw new SecurityTokenException("Invalid credentials");
            }

            var jwtToken = _tokenService.GenerateToken(user);

            return new AuthResponse(jwtToken);
            
        }
    }

  
    

    
}
