using Backend.BusinessLogic.Features.ShopService.Vms;
using Backend.BusinessLogic.Models.Response;

namespace Backend.BusinessLogic.Features.ShopServices
{
    public interface IShopService
    {
        Task<List<ShopVm>> GetShops();
        Task<ShopVm> GetShopById(int id);
        Task<ShopVm> AddShop(ShopVm shop);
        Task<ShopVm> UpdateShop(ShopVm shopUpdate);
        Task<Response> DeleteShop(int id);
    }
}
