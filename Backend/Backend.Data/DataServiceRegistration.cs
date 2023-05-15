using Backend.Data.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Backend.Data
{
    public static class DataServiceRegistration
    {
        public static IServiceCollection AddDataServices(this IServiceCollection services,
                                                                    IConfiguration configuration)
        {
            services.AddDbContext<ExamenShopOnlineContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("ConnectionString"),
                b => b.MigrationsAssembly(typeof(ExamenShopOnlineContext).Assembly.FullName)
                )
            );

            return services;
        }
    }
}
