using Backend.BusinessLogic.Features.AuthServices;
using Backend.BusinessLogic.Models.Request;
using Backend.BusinessLogic.Models.Response;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace Backend.Controllers
{
    //Admin123*$
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        private readonly IAuthService authService;

        public AuthController(IAuthService authService)
        {
            this.authService = authService;
        }

        [AllowAnonymous]
        [HttpPost("login", Name = "Login")]
        [ProducesResponseType(typeof(ActionResult<LoginResponse>), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<LoginResponse>> Login(
           [FromBody] LoginRequest request
        )
        {
            LoginResponse result = await authService.Login(request); 
            return Ok(result);
            
        }
        
        [AllowAnonymous]
        [HttpPost("register", Name = "Register")]
        [ProducesResponseType(typeof(ActionResult<LoginResponse>), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<LoginResponse>> Register(
           [FromBody] RegisterRequest request
        )
        {
            LoginResponse result = await authService.Register(request); 
            return Ok(result);
        }
    }
}
