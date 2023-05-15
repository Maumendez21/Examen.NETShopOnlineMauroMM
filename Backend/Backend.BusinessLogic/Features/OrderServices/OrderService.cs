using AutoMapper;
using Backend.BusinessLogic.Features.OrderServices.Vms;
using Backend.BusinessLogic.Models.Request;
using Backend.BusinessLogic.Models.Response;
using Backend.Data.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Backend.BusinessLogic.Features.OrderServices
{
    public class OrderService : IOrderService
    {
        private readonly ExamenShopOnlineContext _context;
        private readonly IMapper _mapper;

        public OrderService(ExamenShopOnlineContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<OrderResponse> RealizarCompra(OrderRequest request)
        {
            if (request.CartItems!.Count == 0) return new OrderResponse {Ok = false, Message ="Debes seleccionar productos para comprar" };

            Order order = new Order
            {
                Date = DateTime.Now,
                Total = (decimal)request.Total!,
                UserId = request.UserId
            };

            _context.Order.Add(order);
            await _context.SaveChangesAsync();

            List<CartItem> cartItemsNew = new List<CartItem>();
            List<Product> products = new List<Product>();

            foreach (CartItemVm item in request.CartItems)
            {
                CartItem temp = _mapper.Map<CartItem>(item);
                temp.OrderId = order.IdOrder;
                cartItemsNew.Add(temp);


                Product product = await _context.Product.Where(p => p.IdPorduct == item.ProductId).FirstOrDefaultAsync();
                product.Stock = product.Stock - item.Amount;
                products.Add(product);
            }

            _context.Product.UpdateRange(products);
            _context.CartItem.AddRange(cartItemsNew);
            await _context.SaveChangesAsync();

            return new OrderResponse
            {
                Ok = true,
                Message = "Compra realizada correctamente.",
                OrderId = order.IdOrder,
                Date = order.Date,
                Items = _mapper.Map<List<CartItemVm>>(cartItemsNew)
            };
        }
    }
}