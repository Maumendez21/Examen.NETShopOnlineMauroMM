using AutoMapper;
using Backend.BusinessLogic.Features.AuthServices;
using Backend.BusinessLogic.Features.OrderServices;
using Backend.BusinessLogic.Features.ProductsServices;
using Backend.BusinessLogic.Features.ShopServices;
using Backend.BusinessLogic.Services.ImageClouddinary;
using Backend.BusinessLogic.Utilities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Backend.BusinessLogic
{
    public static class BusinessLogicServiceRegistration
    {
        public static IServiceCollection AddBusinessLogicServices(
            this IServiceCollection services,
            IConfiguration configuration
        )
        {
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["jwt:key"])),
                    ClockSkew = System.TimeSpan.Zero
                });

            var mapperConfig = new MapperConfiguration(mc => {
                mc.AddProfile(new MappingProfile());
            });

            IMapper mapper = mapperConfig.CreateMapper();
            services.AddSingleton(mapper);
            services.AddScoped<IManageImageService, ManageImageService>();
            services.AddTransient<IAuthService, AuthService>();
            services.AddTransient<IProductService, ProductService>();
            services.AddTransient<IShopService, ShopService>();
            services.AddTransient<IOrderService, OrderService>();
            return services;
        }
    }
}
