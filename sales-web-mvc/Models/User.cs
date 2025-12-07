namespace SalesWebMvc.Models
{
    public class User
    {

        public User(string email, string password, string role)
        {
            
            Email = email;
            Password = password;
            Role = role;
        }

        public Guid Id { get; set; } 
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;

        public string Role { get; set; } = "User";

    }
}
