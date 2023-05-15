using Backend.BusinessLogic.Features.OrderServices.Vms;

namespace Backend.BusinessLogic.Models.Response
{
    public class OrderResponse : Response
    {
        public int OrderId { get; set; }
        public DateTime Date { get; set; }
        public List<CartItemVm>? Items { get; set; }
    }
}