
using Backend.BusinessLogic.Models.Request;
using Backend.BusinessLogic.Models.Response;
using Backend.Data.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using SHA3.Net;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Backend.BusinessLogic.Features.AuthServices
{
    public class AuthService : IAuthService
    {

        private readonly ExamenShopOnlineContext _context;
        private readonly IConfiguration _configuration;

        public AuthService(ExamenShopOnlineContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<LoginResponse> Login(LoginRequest login)
        {
            User user = await _context.User.FirstOrDefaultAsync(u => u.Email == login.Email.Trim());

            if (user is null) return new LoginResponse { Ok = false, Message = "Este usuario no existe" };

            string passLoginCifrado = sha3512(login.Password.Trim());


            if (passLoginCifrado != user.Password.Trim()) return new LoginResponse { Ok = false, Message = "Credenciales incorrectas" };

            return new LoginResponse
            {
                Ok = true,
                Message = "Inicio de sesión correcto",
                Name = user.Name,
                LastName = user.Name,
                Rol = user.RolId,
                ShopId = user.RolId != 2 ? 0 : user.ShopId,
                UserId = user.IdUser,
                Token = BuildToken(user)
            };
        }

        public async Task<LoginResponse> Register(RegisterRequest register)
        {
            bool userExist = await _context.User.FirstOrDefaultAsync(u => u.Email == register.Email!.Trim()) is null ? false : true;

            if (userExist) return new LoginResponse { Ok = false, Message = "Este correo ya esta en uso" };
            string passEncript = sha3512(register.Password!);
            User newUser = new User
            {
                Name = register.Name,
                Email = register.Email,
                LastName = register.LastName,
                Address = register.Address,
                Password = passEncript,
                ShopId = 0,
                RolId = 3
            };

            try
            {
                _context.User.Add(newUser);
                await _context.SaveChangesAsync();
                return new LoginResponse { 
                    Ok = true, 
                    Message = "Usuario creado correctamente",
                    Name = newUser.Name,
                    LastName = newUser.Name,
                    Rol = newUser.RolId,
                    ShopId = 0,
                    UserId = newUser.IdUser,
                    Token = BuildToken(newUser)
                };
            }
            catch (Exception e)
            {

                return new LoginResponse { Ok = false, Message = e.Message };
            }
        }

        private string BuildToken(User user)
        {
            //var user = _dataBaseContext.Usuario.First(x => x.Usrid == id);
            //string username = user.Usrnombre;
            //string name = user.Usrnombre;
            //long userId = user.Usrid;

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.UniqueName, user.Name),
                new Claim(ClaimTypes.Name, user.Email),
                new Claim("userId", user.IdUser.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expiration = DateTime.UtcNow.AddHours(24);

            JwtSecurityToken token = new JwtSecurityToken(
               issuer: null,
               audience: null,
               claims: claims,
               expires: expiration,
               signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        private string sha3512(string value)
        {
            StringBuilder stringBuilder = new StringBuilder();
            using (var shaAlg = Sha3.Sha3512())
            {
                byte[] hash = shaAlg.ComputeHash(Encoding.UTF8.GetBytes(value));

                for (int i = 0; i < hash.Length; i++)
                {
                    stringBuilder.Append(hash[i].ToString("x2"));
                }
            }
            return stringBuilder.ToString();
        }
    }
}
