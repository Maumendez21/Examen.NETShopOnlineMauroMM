

namespace Backend.BusinessLogic.Models.Response
{
    public class LoginResponse : Response
    {
        public string? Token { get; set; }
        public int? ShopId { get; set; }
        public int? Rol { get; set; }
        public string? Name { get; set; }
        public string? LastName { get; set; }
        public int? UserId { get; set; }
    }
}
