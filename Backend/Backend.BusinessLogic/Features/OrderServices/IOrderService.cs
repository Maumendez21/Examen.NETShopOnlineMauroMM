using Backend.BusinessLogic.Models.Request;
using Backend.BusinessLogic.Models.Response;

namespace Backend.BusinessLogic.Features.OrderServices
{
    public interface IOrderService
    {
        Task<OrderResponse> RealizarCompra(OrderRequest request); 
    }
}