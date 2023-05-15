

using Backend.BusinessLogic.Features.ProductsService.Vms;
using Backend.BusinessLogic.Models.Response;

namespace Backend.BusinessLogic.Features.ProductsServices
{
    public interface IProductService
    {
        Task<List<ProductVm>> GetProducts();
        Task<List<ProductVm>> GetProductsByShop(int idShop);
        Task<ProductVm> GetProductById(int id);
        Task<ProductVm> AddProduct(ProductVm product);
        Task<ProductVm> UpdateProduct(ProductVm productUpdate);
        Task<Response> DeleteProduct(int id);
    }
}
