namespace SalesWebMvc.Dto
{
    public record RegisterRequest(string email, string password, string confirmPassword);
}
