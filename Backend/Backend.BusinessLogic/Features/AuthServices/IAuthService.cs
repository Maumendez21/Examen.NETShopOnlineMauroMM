
using Backend.BusinessLogic.Models.Request;
using Backend.BusinessLogic.Models.Response;

namespace Backend.BusinessLogic.Features.AuthServices
{
    public interface IAuthService
    {
        Task<LoginResponse> Login(LoginRequest login);
        Task<LoginResponse> Register(RegisterRequest register);
    }
}
