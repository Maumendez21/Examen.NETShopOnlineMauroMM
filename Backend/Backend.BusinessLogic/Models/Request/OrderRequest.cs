using Backend.BusinessLogic.Features.OrderServices.Vms;

namespace Backend.BusinessLogic.Models.Request
{
    public class OrderRequest 
    {
        public int UserId { get; set; }
        public List<CartItemVm>? CartItems {get; set;}
        public decimal? Total { get; set;}
    }
}